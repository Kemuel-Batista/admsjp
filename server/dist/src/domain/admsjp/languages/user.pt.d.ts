declare const pt: {
    user: {
        auth: {
            invalidCredentials: string;
            token: {
                invalid: string;
                missing: string;
            };
            refreshToken: {
                invalidRefreshToken: string;
            };
            oldPassword: {
                invalid: string;
            };
            inactiveUser: string;
        };
        create: {
            alreadyExists: string;
        };
        update: {
            id: {
                notFound: string;
            };
            username: {
                alreadyExists: string;
            };
            status: {
                alreadyHasThisStatus: string;
            };
            log: string;
        };
        find: {
            id: {
                notFound: string;
            };
            notFound: string;
        };
        profile: {
            action: {
                permissionDenied: string;
            };
            developer: string;
            operator: string;
            consulta: string;
            supervisor: string;
        };
        status: {
            active: string;
            inactive: string;
        };
        'update-self-password': string;
        'update-user': string;
        'update-password': string;
        'delete-user': string;
        'create-user': string;
        'update-status-user': string;
    };
};
export default pt;
