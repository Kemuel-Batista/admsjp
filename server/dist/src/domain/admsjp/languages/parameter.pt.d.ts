declare const pt: {
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
};
export default pt;
