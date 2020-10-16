# Tanque de Vendas - (Ionic e Firebase)

> A ideia é continuar a captura e edição das informações dos clientes utilizando o Google Forms. Foi utilizada uma macro que gera um UUID para cada registro na planilha de coleta de dados e permite a edição com o uso deste link. [Planilha](https://xfanatical.com/blog/how-to-edit-google-forms-responses-in-the-spreadsheet/)

# Login
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/login_warning.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/login_danger.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/login_success.png?raw=true"></img>

### Administrador (criado no Firebase)
> O usuário criado como **Administrador** terá as seguintes funcionalidades disponibilizadas na Aplicação:

<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/empresa.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/formulario.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/usuarios.png?raw=true"></img>

1. Cadastro e Consulta de Empresas onde terá a configuração de alguns Links.

<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/add_empresa.png?raw=true"></img>

> Realiza o Cadastro e Edição de uma Empresa.

2. Cadastro e Consulta de Formulários (Planilhas) -> Onde será feito a integração com o Google Planilhas pelo ID (referente a planilha).

<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/formulario_add.png?raw=true"></img>

> Realiza o Cadastro e Edição de um Formulário (Planilha) que será integrada.

3. Cadastro e Consulta de Usuários (Vendedores).

<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/user_add.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/user_add1.png?raw=true"></img>
<img src="https://github.com/srGuardia/28962-GrandesPlanos/blob/main/imagens/user_add2.png?raw=true"></img>

> Realiza o Cadastro e Edição do usuário (Vendedor), vincula ele a uma Empresa e ao Formulário (Planilha) de integração.

### Vendedor (criado pelo Administrador)
> O Vendedor assim que se autenticar na aplicação apenas terá uma tela (Home), com as seguintes funcionalidades:

1. Cadastrar uma possível **Prospect**.
2. Acessar o site Grandes **Planos**.
3. Acessar a Planilha de **Tanque de Vendas**.
4. Acessar o canal do Youtube da **Grande Planos**.
5. Acessar a Planilha de **Forecast**.
6. Alterar os dados dos **Prospect** referente ao Vendedor autenticado na aplicação.
