import prisma from "@/db/prisma"

export async function getUserConnections(userId: string) {
  try {
    const connections = await prisma.aiConnection.findMany({
      where: { userId },
      include: {
        provider: true,
      },
      orderBy: { createdAt: "desc" },
    })
    
    // Sanitize to never return encryptedSecret to client
    return connections.map(({ encryptedSecret, ...rest }) => rest)
  } catch (error) {
    console.error("Failed to fetch user connections:", error)
    return []
  }
}

export async function getDashboardStats(userId: string) {
  try {
    const connectionCount = await prisma.aiConnection.count({
      where: { userId },
    })

    const connections = await prisma.aiConnection.findMany({
      where: { userId },
      select: { providerId: true },
    })
    const uniqueProviderIds = new Set(connections.map((c) => c.providerId))
    const providerCount = uniqueProviderIds.size

    // Get launches from this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const launchesThisWeek = await prisma.launchHistory.count({
      where: {
        userId,
        createdAt: {
          gte: oneWeekAgo,
        },
      },
    })

    // Get last launch date
    const lastLaunch = await prisma.launchHistory.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    })

    // Security status: check how many manual credentials exist
    const manualConnectionsCount = await prisma.aiConnection.count({
      where: {
        userId,
        authType: "MANUAL_CREDENTIAL",
      },
    })

    return {
      connectionCount,
      providerCount,
      launchesThisWeek,
      lastLaunchAt: lastLaunch?.createdAt || null,
      securityScore: manualConnectionsCount === 0 ? "A+" : manualConnectionsCount < 3 ? "A" : "B",
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error)
    return {
      connectionCount: 0,
      providerCount: 0,
      launchesThisWeek: 0,
      lastLaunchAt: null,
      securityScore: "N/A",
    }
  }
}

export async function getLaunchHistory(userId: string, limit = 50) {
  try {
    const history = await prisma.launchHistory.findMany({
      where: { userId },
      include: {
        connection: {
          include: {
            provider: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    })

    // Sanitize to never return encryptedSecret to client
    return history.map((item) => {
      if (item.connection) {
        const { encryptedSecret, ...connRest } = item.connection
        return {
          ...item,
          connection: connRest,
        }
      }
      return item
    })
  } catch (error) {
    console.error("Failed to fetch launch history:", error)
    return []
  }
}

export async function getLaunchStatsByDay(userId: string) {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const launches = await prisma.launchHistory.findMany({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo },
      },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    })

    // Group launches by day of week
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const chartData: Record<string, number> = {}

    // Initialize past 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dayName = days[d.getDay()]
      chartData[dayName] = 0
    }

    launches.forEach((l) => {
      const dayName = days[new Date(l.createdAt).getDay()]
      if (dayName in chartData) {
        chartData[dayName] += 1
      }
    })

    return Object.entries(chartData).map(([name, launches]) => ({
      name,
      launches,
    }))
  } catch (error) {
    console.error("Failed to fetch launch stats by day:", error)
    return []
  }
}
