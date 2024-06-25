"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pt = {
    event: {
        create: {
            invalidAttachmentType: 'Formato {{key}} inválido.',
            keyAlreadyExists: 'Event {{key}} já existe no sistema',
        },
        find: {
            notFound: 'Não foi possível localizar o event {{key}}',
            invalidStatus: 'Status inválido, esperado {{expectedStatus}} recebido {{receivedStatus}}',
            disable: 'Event está desativado',
            invalidEventType: 'Tipo de evento inválido para essa operação',
        },
        update: {
            keyAlreadyExists: 'Event {{key}} já existe no sistema',
            value: 'Alterado valor do prametro',
        },
        delete: {
            hasAssociations: 'Não foi possível deletar o evento pois existem ingressos associados a esse evento',
        },
    },
};
exports.default = pt;
//# sourceMappingURL=event.pt.js.map