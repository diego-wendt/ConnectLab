export const ApiOperations = {
  Auth: {
    signup: {
      ApiOperation: {
        summary: 'Cadastro',
        description: 'Endereço para cadastro de usuário.',
      },
      ApiResponse: {},
    },
    signin: {
      ApiOperation: {
        summary: 'Login',
        description: 'Endereço para realização de login na aplicação.',
      },
      ApiResponse: {},
    },
    changepassword: {
      ApiOperation: {
        summary: 'Alteração de senha',
        description: 'Endereço para alteração de senha.',
      },
      ApiResponse: {},
    },
  },
  Devices: {
    findAllModels: {
      ApiOperation: {
        summary: 'Buscar modelos de dispositivos',
        description: 'Buscar modelos de dispositivos disponíveis para cadastro',
      },
      ApiResponse: {},
    },
    createDevice: {
      ApiOperation: {
        summary: 'Cadastrar dispositivo',
        description: 'Cadastro de dispositivo para o usuário',
      },
      ApiResponse: {},
    },
    getPlaces: {
      ApiOperation: {
        summary: 'Buscar locais',
        description:
          'Buscar locais disponíveis para instalação dos dispositivos do usuário.',
      },
      ApiResponse: {},
    },
    listUserDevices: {
      ApiOperation: {
        summary: 'Buscar dispositivos',
        description: 'Buscar todos os dispositivos do usuário',
      },
      ApiResponse: {},
    },
    findDevice: {
      ApiOperation: {
        summary: 'Buscar um dispositivo',
        description: 'Buscar todos os dados de um dispositivo do usuário',
      },
      ApiResponse: {},
    },
    switchDevice: {
      ApiOperation: {
        summary: 'Ligar/Desligar dispositivo',
        description: 'Alterar estado do dispositivo (ligar/desligar)',
      },
      ApiResponse: {},
    },
    deleteDevice: {
      ApiOperation: {
        summary: 'Excluir dispositivo',
        description: 'Excluir um dispositivo do usuário.',
      },
      ApiResponse: {},
    },
  },
  Users: {
    getUser: {
      ApiOperation: {
        summary: 'Buscar usuário',
        description: 'Endereço para realizar busca dos dados usuário.',
      },
      ApiResponse: {},
    },
    updateUser: {
      ApiOperation: {
        summary: 'Atualizar usuário',
        description: 'Endereço para atualizar dados não sensíveis do usuário.',
      },
      ApiResponse: {},
    },
    deleteUser: {
      ApiOperation: {
        summary: 'Deletar usuário',
        description: 'Endereço para exclusão do usuário.',
      },
      ApiResponse: {},
    },
  },
};
