"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateConnectionSchema, type UpdateConnectionInput } from "@/lib/validators";
import { deleteConnectionAction, updateConnectionAction } from "@/server/actions/account-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Calendar,
  Check,
  Copy,
  Edit2,
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ConnectionCardProps {
  connection: {
    id: string
    label: string
    accountEmail?: string | null
    username?: string | null
    authType: string
    launchType: string
    externalUrl?: string | null
    secretHint?: string | null
    lastLaunchedAt?: Date | string | null
    notes?: string | null
    provider: {
      name: string
      slug: string
      color?: string | null
    }
  }
  onDeleted?: () => void
  onUpdated?: (updatedConnection: any) => void
}

export function ConnectionCard({ connection, onDeleted, onUpdated }: ConnectionCardProps) {
  const t = useTranslations("dashboard")
  const brandColor = connection.provider.color || "#8B5CF6"
  
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  
  // Strategy dialog state
  const [showLaunchModal, setShowLaunchModal] = useState(false)
  const [launchPayload, setLaunchPayload] = useState<{
    strategy: string
    maskedSecret?: string
    url?: string
    message?: string
  } | null>(null)
  
  // Reveal state
  const [isRevealed, setIsRevealed] = useState(false)
  const [plainSecret, setPlainSecret] = useState("")
  const [isRevealing, setIsRevealing] = useState(false)
  
  // Copy state
  const [copied, setCopied] = useState(false)

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: editErrors },
    reset: resetEdit,
  } = useForm<UpdateConnectionInput>({
    resolver: zodResolver(updateConnectionSchema),
    defaultValues: {
      connectionId: connection.id,
      providerId: "dummy",
      label: connection.label,
      accountEmail: connection.accountEmail || "",
      username: connection.username || "",
      authType: connection.authType as any,
      externalUrl: connection.externalUrl || "",
      secret: "",
      notes: (connection as any).notes || "",
    },
  })

  const onUpdateSubmit = async (data: UpdateConnectionInput) => {
    setIsUpdating(true)
    try {
      const res = await updateConnectionAction(data)
      if (res.ok) {
        toast.success(res.message)
        setShowEditModal(false)
        if (onUpdated) {
          onUpdated({
            id: connection.id,
            label: data.label,
            accountEmail: data.accountEmail,
            username: data.username,
            authType: data.authType,
            externalUrl: data.externalUrl,
            notes: data.notes,
            secretHint: data.secret ? (data.secret.length > 4 ? `sk-...${data.secret.slice(-4)}` : "sk-...key") : connection.secretHint,
          })
        }
      } else {
        toast.error(res.message || "Failed to update connection.")
      }
    } catch {
      toast.error("Failed to perform update.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLaunch = async () => {
    setIsLaunching(true)
    try {
      const res = await fetch(`/api/launch/${connection.id}`, { method: "POST" })
      const data = await res.json()
      
      if (!res.ok || !data.ok) {
        toast.error(data.message || "Failed to launch account connection.")
        return
      }

      toast.success("Launch registered in logs.")
      
      if (data.strategy === "redirect" && data.url) {
        // Redirect directly in new window
        window.open(data.url, "_blank")
      } else {
        // Show strategy details dialog
        setLaunchPayload(data)
        setShowLaunchModal(true)
      }
    } catch (error) {
      console.error("Launch request error:", error)
      toast.error("An error occurred during launch.")
    } finally {
      setIsLaunching(false)
    }
  }

  const handleReveal = async () => {
    if (isRevealed) {
      setIsRevealed(false)
      return
    }
    
    setIsRevealing(true)
    try {
      const res = await fetch(`/api/connections/${connection.id}/reveal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmation: "REVEAL_SECRET" }),
      })
      const data = await res.json()
      
      if (!res.ok || !data.ok) {
        toast.error(data.message || "Failed to reveal secret.")
        return
      }
      
      setPlainSecret(data.secret)
      setIsRevealed(true)
    } catch (error) {
      toast.error("Error occurred while fetching credentials.")
    } finally {
      setIsRevealing(false)
    }
  }

  const handleCopy = () => {
    const textToCopy = plainSecret || connection.secretHint || ""
    if (!textToCopy) return
    
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    toast.success(t("copied"))
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    if (!confirm(t("deleteConfirm"))) return
    
    setIsDeleting(true)
    try {
      const res = await deleteConnectionAction({ connectionId: connection.id })
      if (res.ok) {
        toast.success(res.message)
        if (onDeleted) onDeleted()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      toast.error("Failed to delete connection.")
    } finally {
      setIsDeleting(false)
    }
  }

  const formattedDate = connection.lastLaunchedAt
    ? new Date(connection.lastLaunchedAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Never"

  return (
    <>
      <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full group">
        <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
          <div className="flex items-center space-x-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-md text-sm select-none"
              style={{
                background: `linear-gradient(135deg, ${brandColor} 0%, rgba(13,18,36,1) 100%)`,
                border: `1px solid ${brandColor}22`,
              }}
            >
              {connection.provider.name.charAt(0)}
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white leading-tight">
                {connection.label}
              </CardTitle>
              <span className="text-xs text-slate-500 font-medium">
                {connection.provider.name}
              </span>
            </div>
          </div>

          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                resetEdit({
                  connectionId: connection.id,
                  providerId: "dummy",
                  label: connection.label,
                  accountEmail: connection.accountEmail || "",
                  username: connection.username || "",
                  authType: connection.authType as any,
                  externalUrl: connection.externalUrl || "",
                  secret: "",
                  notes: (connection as any).notes || "",
                })
                setShowEditModal(true)
              }}
              className="text-slate-500 hover:text-white hover:bg-slate-900 rounded-lg w-8 h-8"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-slate-500 hover:text-destructive hover:bg-destructive/10 rounded-lg w-8 h-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="py-2 space-y-2 flex-1">
          {/* Email / Username details */}
          {(connection.accountEmail || connection.username) && (
            <div className="bg-[#070a18]/40 border border-[#11172a] rounded-lg p-2.5 space-y-1">
              {connection.accountEmail && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Email</span>
                  <span className="text-slate-300 truncate max-w-[160px]">
                    {connection.accountEmail}
                  </span>
                </div>
              )}
              {connection.username && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Username</span>
                  <span className="text-slate-300 truncate max-w-[160px]">
                    {connection.username}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Launch Details */}
          <div className="flex justify-between items-center text-xs pt-1">
            <span className="text-slate-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-slate-500" />
              Last used
            </span>
            <span className="text-slate-300 font-medium">{formattedDate}</span>
          </div>

          {connection.secretHint && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 flex items-center">
                <Lock className="w-3 h-3 mr-1 text-slate-500" />
                Key type
              </span>
              <span className="text-slate-400 font-mono text-[10px] bg-slate-900/60 px-1.5 py-0.5 rounded border border-[#11172a]">
                {connection.secretHint}
              </span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-3 border-t border-[#11172a] mt-4 flex items-center">
          <Button
            onClick={handleLaunch}
            disabled={isLaunching}
            className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl h-9 shadow-lg shadow-primary/5"
          >
            {isLaunching ? (
              "Launching..."
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-secondary" />
                {t("launchBtn")}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Strategy launch modal for manual credentials copy */}
      {showLaunchModal && launchPayload && (
        <Dialog open={showLaunchModal} onOpenChange={setShowLaunchModal}>
          <DialogContent className="sm:max-w-md bg-[#0b1020] border-[#11172a] text-foreground rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                {t("launchBtn")} — {connection.provider.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs mt-1">
                {launchPayload.message || t("launchStrategyManual")}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              <div className="bg-[#070a18] border border-[#11172a] rounded-xl p-4 space-y-3">
                {connection.accountEmail && (
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-slate-500">Email</span>
                    <span className="text-sm font-semibold text-slate-200">{connection.accountEmail}</span>
                  </div>
                )}
                
                {/* Hidden credential field */}
                {connection.secretHint && (
                  <div className="flex flex-col space-y-1.5">
                    <span className="text-xs text-slate-500">Credential / Token</span>
                    <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2">
                      <span className="font-mono text-sm flex-1 text-slate-200 select-all truncate">
                        {isRevealed ? plainSecret : connection.secretHint}
                      </span>
                      
                      {/* Reveal Toggle */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleReveal}
                        disabled={isRevealing}
                        className="w-8 h-8 text-slate-400 hover:text-white"
                      >
                        {isRevealing ? (
                          "..."
                        ) : isRevealed ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>

                      {/* Copy Action */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopy}
                        className="w-8 h-8 text-slate-400 hover:text-white"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex sm:justify-between items-center mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLaunchModal(false)}
                className="w-full sm:w-auto bg-transparent border-[#11172a] hover:bg-slate-950 text-slate-400 rounded-xl"
              >
                Close
              </Button>
              {launchPayload.url && (
                <Button
                  asChild
                  size="sm"
                  className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-xl"
                >
                  <a href={launchPayload.url} target="_blank" rel="noopener noreferrer">
                    Open Provider Site
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {showEditModal && (
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="sm:max-w-md bg-[#0b1020] border-[#11172a] text-foreground rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white flex items-center">
                <Edit2 className="w-4 h-4 mr-2 text-primary" />
                {t("editAccount")}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs mt-1">
                Modify connection label, credentials, or redirection options.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmitEdit(onUpdateSubmit)} className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-label" className="text-slate-300">Label</Label>
                <Input
                  id="edit-label"
                  {...registerEdit("label")}
                  className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl"
                />
                {editErrors.label && (
                  <span className="text-xs text-red-500 font-medium">{editErrors.label.message}</span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email" className="text-slate-300">Email</Label>
                  <Input
                    id="edit-email"
                    {...registerEdit("accountEmail")}
                    className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-username" className="text-slate-300">Username</Label>
                  <Input
                    id="edit-username"
                    {...registerEdit("username")}
                    className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-url" className="text-slate-300">Launch URL</Label>
                <Input
                  id="edit-url"
                  {...registerEdit("externalUrl")}
                  className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-secret" className="text-slate-300">
                  New Password / API Key (Leave empty to keep existing)
                </Label>
                <Input
                  id="edit-secret"
                  type="password"
                  placeholder="••••••••••••"
                  {...registerEdit("secret")}
                  className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes" className="text-slate-300">Notes</Label>
                <Textarea
                  id="edit-notes"
                  {...registerEdit("notes")}
                  className="bg-[#070a18] border-[#11172a] text-slate-200 rounded-xl min-h-[60px]"
                />
              </div>

              <DialogFooter className="flex sm:justify-between items-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowEditModal(false)}
                  className="w-full sm:w-auto bg-transparent border-[#11172a] hover:bg-slate-950 text-slate-400 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white rounded-xl"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
export default ConnectionCard
