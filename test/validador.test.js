const Validador = require("../src/validador");

describe("validador", () => {
  test("deve validar formato de e-mail", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const emailValido = validador.validarEmail("usuario@dominio.com");
    const emailSemArroba = validador.validarEmail("usuariodominio.com");
    const emailVazio = validador.validarEmail("");

    // Assert
    expect(emailValido).toBe(true);
    expect(emailSemArroba).toBe(false);
    expect(emailVazio).toBe(false);
  });

  test("deve validar forca de uma senha", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const senhaForte = validador.validarSenha("Senha123!");
    const senhaCurta = validador.validarSenha("Ab1!");
    const senhaSemSimbolo = validador.validarSenha("Senha1234");
    const senhaVazia = validador.validarSenha("");

    // Assert
    expect(senhaForte).toBe(true);
    expect(senhaCurta).toBe(false);
    expect(senhaSemSimbolo).toBe(false);
    expect(senhaVazia).toBe(false);
  });

  test("deve validar CPF verificando digitos verificadores", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const cpfValido = validador.validarCPF("529.982.247-25");
    const cpfComPrimeiroDigitoZero = validador.validarCPF("00000000604");
    const cpfComDigitosIguais = validador.validarCPF("111.111.111-11");
    const cpfComDigitoInvalido = validador.validarCPF("529.982.247-00");
    const cpfComTamanhoInvalido = validador.validarCPF("123");
    const cpfNulo = validador.validarCPF(null);

    // Assert
    expect(cpfValido).toBe(true);
    expect(cpfComPrimeiroDigitoZero).toBe(true);
    expect(cpfComDigitosIguais).toBe(false);
    expect(cpfComDigitoInvalido).toBe(false);
    expect(cpfComTamanhoInvalido).toBe(false);
    expect(cpfNulo).toBe(false);
  });

  test("deve validar CNPJ verificando digitos verificadores", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const cnpjValido = validador.validarCNPJ("11.222.333/0001-81");
    const cnpjComPrimeiroDigitoZero = validador.validarCNPJ("00000000000604");
    const cnpjComDigitosIguais = validador.validarCNPJ("11.111.111/1111-11");
    const cnpjComDigitoInvalido = validador.validarCNPJ("11.222.333/0001-00");
    const cnpjComTamanhoInvalido = validador.validarCNPJ("123");
    const cnpjNulo = validador.validarCNPJ(null);

    // Assert
    expect(cnpjValido).toBe(true);
    expect(cnpjComPrimeiroDigitoZero).toBe(true);
    expect(cnpjComDigitosIguais).toBe(false);
    expect(cnpjComDigitoInvalido).toBe(false);
    expect(cnpjComTamanhoInvalido).toBe(false);
    expect(cnpjNulo).toBe(false);
  });

  test("deve validar formato de CEP", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const cepComTraco = validador.validarCEP("01310-100");
    const cepSemTraco = validador.validarCEP("01310100");
    const cepInvalido = validador.validarCEP("123");
    const cepVazio = validador.validarCEP("");

    // Assert
    expect(cepComTraco).toBe(true);
    expect(cepSemTraco).toBe(true);
    expect(cepInvalido).toBe(false);
    expect(cepVazio).toBe(false);
  });

  test("deve validar formato de telefone brasileiro", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const telefoneComDDD = validador.validarTelefone("(11) 98765-4321");
    const telefoneFixo = validador.validarTelefone("(11) 3456-7890");
    const telefoneInvalido = validador.validarTelefone("123");
    const telefoneVazio = validador.validarTelefone("");

    // Assert
    expect(telefoneComDDD).toBe(true);
    expect(telefoneFixo).toBe(true);
    expect(telefoneInvalido).toBe(false);
    expect(telefoneVazio).toBe(false);
  });

  test("deve validar formato de uma URL", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const urlValida = validador.validarURL("https://www.exemplo.com");
    const urlInvalida = validador.validarURL("nao-e-uma-url");

    // Assert
    expect(urlValida).toBe(true);
    expect(urlInvalida).toBe(false);
  });

  test("deve validar data no formato dd/mm/aaaa", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const dataValida = validador.validarData("31/12/2023");
    const dataInexistente = validador.validarData("31/02/2023");
    const dataFormatoInvalido = validador.validarData("2023-12-31");
    const dataVazia = validador.validarData("");

    // Assert
    expect(dataValida).toBe(true);
    expect(dataInexistente).toBe(false);
    expect(dataFormatoInvalido).toBe(false);
    expect(dataVazia).toBe(false);
  });

  test("deve validar se uma idade atende a um minimo exigido", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const idadeSuficiente = validador.validarIdadeMinima(18, 18);
    const idadeInsuficiente = validador.validarIdadeMinima(16, 18);
    const idadeNaoNumerica = validador.validarIdadeMinima("18", 18);

    // Assert
    expect(idadeSuficiente).toBe(true);
    expect(idadeInsuficiente).toBe(false);
    expect(idadeNaoNumerica).toBe(false);
  });

  test("deve validar se um campo obrigatorio foi preenchido", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const campoPreenchido = validador.validarCampoObrigatorio("Maria");
    const campoComEspacos = validador.validarCampoObrigatorio("   ");
    const campoNulo = validador.validarCampoObrigatorio(null);
    const campoNumerico = validador.validarCampoObrigatorio(0);

    // Assert
    expect(campoPreenchido).toBe(true);
    expect(campoComEspacos).toBe(false);
    expect(campoNulo).toBe(false);
    expect(campoNumerico).toBe(true);
  });

  test("deve validar se um texto atende a um tamanho minimo", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const tamanhoSuficiente = validador.validarTamanhoMinimo("abcde", 3);
    const tamanhoInsuficiente = validador.validarTamanhoMinimo("ab", 3);
    const textoVazio = validador.validarTamanhoMinimo("", 1);

    // Assert
    expect(tamanhoSuficiente).toBe(true);
    expect(tamanhoInsuficiente).toBe(false);
    expect(textoVazio).toBe(false);
  });

  test("deve validar se um texto nao ultrapassa um tamanho maximo", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const dentroDoLimite = validador.validarTamanhoMaximo("abc", 5);
    const acimaDoLimite = validador.validarTamanhoMaximo("abcdef", 5);
    const textoVazio = validador.validarTamanhoMaximo("", 5);

    // Assert
    expect(dentroDoLimite).toBe(true);
    expect(acimaDoLimite).toBe(false);
    expect(textoVazio).toBe(true);
  });

  test("deve validar se um valor contem somente digitos numericos", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const somenteNumeros = validador.validarSomenteNumeros("12345");
    const comLetras = validador.validarSomenteNumeros("123a5");
    const valorVazio = validador.validarSomenteNumeros("");

    // Assert
    expect(somenteNumeros).toBe(true);
    expect(comLetras).toBe(false);
    expect(valorVazio).toBe(false);
  });

  test("deve validar formato de placa de veiculo padrao antigo e mercosul", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const placaAntiga = validador.validarPlacaVeiculo("ABC-1234");
    const placaMercosul = validador.validarPlacaVeiculo("ABC1D23");
    const placaInvalida = validador.validarPlacaVeiculo("1234ABC");
    const placaNula = validador.validarPlacaVeiculo(null);

    // Assert
    expect(placaAntiga).toBe(true);
    expect(placaMercosul).toBe(true);
    expect(placaInvalida).toBe(false);
    expect(placaNula).toBe(false);
  });

  test("deve validar um endereco IPv4", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const ipValido = validador.validarIP("192.168.0.1");
    const ipComOitetoInvalido = validador.validarIP("192.168.0.300");
    const ipComPoucasPartes = validador.validarIP("192.168.0");
    const ipNulo = validador.validarIP(null);

    // Assert
    expect(ipValido).toBe(true);
    expect(ipComOitetoInvalido).toBe(false);
    expect(ipComPoucasPartes).toBe(false);
    expect(ipNulo).toBe(false);
  });

  test("deve validar um codigo de cor hexadecimal", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const corCurta = validador.validarCorHex("#fff");
    const corCompleta = validador.validarCorHex("#a1b2c3");
    const corInvalida = validador.validarCorHex("a1b2c3");
    const corNula = validador.validarCorHex(null);

    // Assert
    expect(corCurta).toBe(true);
    expect(corCompleta).toBe(true);
    expect(corInvalida).toBe(false);
    expect(corNula).toBe(false);
  });

  test("deve validar se um numero esta dentro de um intervalo", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const dentroDoIntervalo = validador.validarIntervalo(5, 1, 10);
    const noLimiteInferior = validador.validarIntervalo(1, 1, 10);
    const foraDoIntervalo = validador.validarIntervalo(15, 1, 10);
    const valorNaoNumerico = validador.validarIntervalo("5", 1, 10);

    // Assert
    expect(dentroDoIntervalo).toBe(true);
    expect(noLimiteInferior).toBe(true);
    expect(foraDoIntervalo).toBe(false);
    expect(valorNaoNumerico).toBe(false);
  });

  test("deve validar se duas senhas informadas coincidem", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const senhasIguais = validador.validarConfirmacaoSenha("Senha123!", "Senha123!");
    const senhasDiferentes = validador.validarConfirmacaoSenha("Senha123!", "Outra123!");
    const senhaVazia = validador.validarConfirmacaoSenha("", "");

    // Assert
    expect(senhasIguais).toBe(true);
    expect(senhasDiferentes).toBe(false);
    expect(senhaVazia).toBe(false);
  });

  test("deve validar um nome de usuario", () => {
    // Arrange
    const validador = new Validador();

    // Act
    const nomeValido = validador.validarNomeUsuario("usuario_01");
    const nomeCurto = validador.validarNomeUsuario("ab");
    const nomeComCaracterInvalido = validador.validarNomeUsuario("usuario@01");
    const nomeNulo = validador.validarNomeUsuario(null);

    // Assert
    expect(nomeValido).toBe(true);
    expect(nomeCurto).toBe(false);
    expect(nomeComCaracterInvalido).toBe(false);
    expect(nomeNulo).toBe(false);
  });

  test("deve validar se um valor esta entre as opcoes permitidas", () => {
    // Arrange
    const validador = new Validador();
    const opcoes = ["ativa", "bloqueada", "encerrada"];

    // Act
    const opcaoPermitida = validador.validarOpcaoPermitida("ativa", opcoes);
    const opcaoNaoPermitida = validador.validarOpcaoPermitida("suspensa", opcoes);

    // Assert
    expect(opcaoPermitida).toBe(true);
    expect(opcaoNaoPermitida).toBe(false);
  });
});
