declare const messages: {
    pt: {
        translations: {
            order: {
                create: {
                    invalidAttachmentType: string;
                };
                find: {
                    notFound: string;
                };
                payment: {
                    ticketOwnerIsNotSame: string;
                    alreadyCompleted: string;
                };
            };
            parameter: {
                create: {
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                };
                update: {
                    keyAlreadyExists: string;
                };
                delete: {
                    hasAssociations: string;
                };
            };
            eventTicket: {
                create: {
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    incorrectAssociation: string;
                };
            };
            eventPurchase: {
                find: {
                    notFound: string;
                    incorrectAssociation: string;
                };
                delete: {
                    timeNotExpired: string;
                };
            };
            eventLot: {
                create: {
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                };
                sales: {
                    'remaining-qty-not-enough': string;
                    'sold-out': string;
                };
            };
            eventAddress: {
                create: {
                    invalidAttachmentType: string;
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    incorrectAssociation: string;
                };
                update: {
                    keyAlreadyExists: string;
                    value: string;
                };
            };
            event: {
                create: {
                    invalidAttachmentType: string;
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    invalidStatus: string;
                    disable: string;
                    invalidEventType: string;
                };
                update: {
                    keyAlreadyExists: string;
                    value: string;
                };
                delete: {
                    hasAssociations: string;
                };
            };
            profilePermission: {
                create: {
                    default: string;
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    invalidStatus: string;
                    disable: string;
                };
                update: {
                    keyAlreadyExists: string;
                    value: string;
                };
            };
            profile: {
                create: {
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    invalidStatus: string;
                    disable: string;
                };
                update: {
                    keyAlreadyExists: string;
                    value: string;
                };
            };
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
            department: {
                create: {
                    keyAlreadyExists: string;
                };
                find: {
                    notFound: string;
                    invalidStatus: string;
                    disable: string;
                };
                update: {
                    keyAlreadyExists: string;
                    value: string;
                };
            };
        };
    };
};
export default messages;
