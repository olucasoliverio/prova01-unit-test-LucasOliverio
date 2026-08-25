class Validador {
  /** Valida o formato de um e-mail */
  validarEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /** Valida a força de uma senha (mín. 8 caracteres, maiúscula, número e símbolo) */
  validarSenha(senha) {
    if (!senha || senha.length < 8) return false;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temSimbolo = /[^A-Za-z0-9]/.test(senha);
    return temMaiuscula && temNumero && temSimbolo;
  }

  /** Valida um CPF verificando os dígitos verificadores */
  validarCPF(cpf) {
    const digitos = (cpf || "").replace(/\D/g, "");
    if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) return false;

    const calcularDigito = (base) => {
      let soma = 0;
      for (let i = 0; i < base.length; i++) {
        soma += Number(base[i]) * (base.length + 1 - i);
      }
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    };

    const primeiroDigito = calcularDigito(digitos.slice(0, 9));
    const segundoDigito = calcularDigito(digitos.slice(0, 10));

    return (
      primeiroDigito === Number(digitos[9]) &&
      segundoDigito === Number(digitos[10])
    );
  }

  /** Valida um CNPJ verificando os dígitos verificadores */
  validarCNPJ(cnpj) {
    const digitos = (cnpj || "").replace(/\D/g, "");
    if (digitos.length !== 14 || /^(\d)\1{13}$/.test(digitos)) return false;

    const calcularDigito = (base, pesos) => {
      const soma = base
        .split("")
        .reduce((total, digito, i) => total + Number(digito) * pesos[i], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const pesos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const pesos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const primeiroDigito = calcularDigito(digitos.slice(0, 12), pesos1);
    const segundoDigito = calcularDigito(digitos.slice(0, 13), pesos2);

    return (
      primeiroDigito === Number(digitos[12]) &&
      segundoDigito === Number(digitos[13])
    );
  }

  /** Valida o formato de um CEP (00000-000 ou 00000000) */
  validarCEP(cep) {
    return /^\d{5}-?\d{3}$/.test(cep || "");
  }

  /** Valida o formato de um telefone brasileiro (com ou sem DDD/9º dígito) */
  validarTelefone(telefone) {
    const digitos = (telefone || "").replace(/\D/g, "");
    return digitos.length === 10 || digitos.length === 11;
  }

  /** Valida o formato de uma URL */
  validarURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /** Valida uma data no formato dd/mm/aaaa */
  validarData(data) {
    const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(data || "");
    if (!match) return false;

    const [, diaStr, mesStr, anoStr] = match;
    const dia = Number(diaStr);
    const mes = Number(mesStr);
    const ano = Number(anoStr);
    const dataObj = new Date(ano, mes - 1, dia);

    return (
      dataObj.getFullYear() === ano &&
      dataObj.getMonth() === mes - 1 &&
      dataObj.getDate() === dia
    );
  }

  /** Valida se uma idade atende a um mínimo exigido */
  validarIdadeMinima(idade, minima) {
    return typeof idade === "number" && idade >= minima;
  }

  /** Valida se um campo obrigatório foi preenchido */
  validarCampoObrigatorio(valor) {
    if (valor === null || valor === undefined) return false;
    if (typeof valor === "string") return valor.trim().length > 0;
    return true;
  }

  /** Valida se um texto atende a um tamanho mínimo */
  validarTamanhoMinimo(texto, tamanho) {
    return (texto || "").length >= tamanho;
  }

  /** Valida se um texto não ultrapassa um tamanho máximo */
  validarTamanhoMaximo(texto, tamanho) {
    return (texto || "").length <= tamanho;
  }

  /** Valida se um valor contém somente dígitos numéricos */
  validarSomenteNumeros(valor) {
    return /^\d+$/.test(valor || "");
  }

  /** Valida o formato de uma placa de veículo (padrão antigo ou Mercosul) */
  validarPlacaVeiculo(placa) {
    const valor = (placa || "").toUpperCase().replace(/[\s-]/g, "");
    return /^[A-Z]{3}\d{4}$/.test(valor) || /^[A-Z]{3}\d[A-Z]\d{2}$/.test(valor);
  }

  /** Valida um endereço IPv4 */
  validarIP(ip) {
    const partes = (ip || "").split(".");
    if (partes.length !== 4) return false;

    return partes.every(
      (parte) => /^\d{1,3}$/.test(parte) && Number(parte) <= 255,
    );
  }

  /** Valida um código de cor hexadecimal */
  validarCorHex(cor) {
    return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(cor || "");
  }

  /** Valida se um número está dentro de um intervalo (inclusive) */
  validarIntervalo(numero, min, max) {
    return typeof numero === "number" && numero >= min && numero <= max;
  }

  /** Valida se duas senhas informadas coincidem */
  validarConfirmacaoSenha(senha, confirmacao) {
    return !!senha && senha === confirmacao;
  }

  /** Valida um nome de usuário (letras, números e underscore, 3 a 16 caracteres) */
  validarNomeUsuario(nomeUsuario) {
    return /^[a-zA-Z0-9_]{3,16}$/.test(nomeUsuario || "");
  }

  /** Valida se um valor está entre as opções permitidas */
  validarOpcaoPermitida(valor, opcoesPermitidas) {
    return opcoesPermitidas.includes(valor);
  }
}

module.exports = Validador;
