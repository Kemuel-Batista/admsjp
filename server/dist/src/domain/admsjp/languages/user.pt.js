"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pt = {
    user: {
        auth: {
            invalidCredentials: 'Credenciais inválidas',
            token: {
                invalid: 'Token inválido',
                missing: 'Token não encontrado',
            },
            refreshToken: {
                invalidRefreshToken: 'Token de atualização inválido',
            },
            oldPassword: {
                invalid: 'Senha atual inválida',
            },
            inactiveUser: 'Usuário desativado',
        },
        create: {
            alreadyExists: 'O email {{key}} já está em uso',
        },
        update: {
            id: {
                notFound: 'Não foi possível encontrar o usuário no sistema',
            },
            username: {
                alreadyExists: 'O nome de usuário {{username}} já está em uso',
            },
            status: {
                alreadyHasThisStatus: 'O usuário já tem o status {{status}}',
            },
            log: 'Usuário alterado',
        },
        find: {
            id: {
                notFound: 'Não foi possível encontrar o usuário no sistema',
            },
            notFound: 'Não foi possível encontrar o usuário {{key}}',
        },
        profile: {
            action: {
                permissionDenied: 'Você não tem permissão para realizar esta ação',
            },
            developer: 'Desenvolvedor',
            operator: 'Operador',
            consulta: 'Consulta',
            supervisor: 'Supervisor',
        },
        status: {
            active: 'Ativo',
            inactive: 'Inativo',
        },
        'update-self-password': 'Usuário alterou a senha',
        'update-user': 'Usuário alterado',
        'update-password': 'Alterado senha do usuário',
        'delete-user': 'Usuário deletado',
        'create-user': 'Usuário criado',
        'update-status-user': 'Alterado status do usuário',
    },
};
exports.default = pt;
//# sourceMappingURL=user.pt.js.map