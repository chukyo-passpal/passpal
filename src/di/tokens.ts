export const DI_TOKENS = {
    // providers
    manaboProvider: "manaboProvider",
    alboProvider: "alboProvider",
    cubicsProvider: "cubicsProvider",
    palAPIProvider: "palAPIProvider",
    remoteConfigProvider: "remoteConfigProvider",

    // repositories
    authRepository: "authRepository",
    adminRepository: "adminRepository",
    assignmentRepository: "assignmentRepository",
    classRepository: "classRepository",
    mailRepository: "mailRepository",
    newsRepository: "newsRepository",
    timetableRepository: "timetableRepository",

    // services
    authService: "authService",
    authCoordinator: "authCoordinator",
    eventService: "eventService",
    assignmentService: "assignmentService",
    classService: "classService",
    mailService: "mailService",
    newsService: "newsService",
    timetableService: "timetableService",
    appService: "appService",
    notificationService: "notificationService",
} as const;

export type DiToken = (typeof DI_TOKENS)[keyof typeof DI_TOKENS];
