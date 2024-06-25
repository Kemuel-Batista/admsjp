declare const pt: {
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
export default pt;
