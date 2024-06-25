declare const pt: {
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
};
export default pt;
