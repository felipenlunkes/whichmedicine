# Plano de Testes de Software

Os requisitos para realização dos testes de software são:

<ul><li>Site publicado na internet;</li>
<li>Navegador da internet: Chrome, Firefox ou Edge.</li>
</ul>

Os testes funcionais a serem realizados na aplicação são descritos a seguir.

<div align="center">
Tabela 7: Casos de teste para teste funcional CT-01
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-01: Verificar o funcionamento dos links da página Home</td>
  <td>
   <ul>
    <li>RF-01:  A aplicação deve permitir a busca dos compostos medicamentosos ou o seu nome comercial.</li>
   <li>RF-02:   A aplicação deve permitir comparar dois medicamentos em relação aos seus compostos.</li>
   <li>RF-07:	A aplicação deve permitir o login de administrador e login de usuário.</li>
   </ul>
  </td>
  <td>Verificar se os links da página Home estão encaminhando para as respectivas páginas corretamente</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar nos links da página Home.</li>
   </ol>
   </td>
  <td>Todos os links da página Home devem encaminhar os usuários para as páginas descritas.</td>
  <td>Fernanda</td>
 </tr>
</table>

<div align="center">
Tabela 8: Casos de teste para teste funcional CT-02
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-02: Verificar o funcionamento da comparação de medicação e funcionalidade do compartilhamento</td>
  <td>
   <ul>
   <li>RF-01: A aplicação deve permitir a busca dos compostos medicamentosos ou o seu nome comercial.</li>
    <li>RF-02: A aplicação deve permitir comparar dois medicamentos em relação aos seus compostos.	</li>
    <li>RF-04: A aplicação deve identificar se há interação ou não entre medicações inseridas pelo usuário.</li>
   </ul>
  </td>
  <td>Verificar se caso haja interação entre medicamentos ou não, esta é indicada na aplicação. </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Digitar duas medicações nos campos "Digite aqui para comparar".</li>
    <li>Clicar no botão "Comparar".</li>
   </ol>
  </td>
  <td>Os dados inseridos nos campos de pesquisa devem mostrar as medicações digitadas anteriormente e se há interação ou não.</td>
  <td>Diovane</td>
 </tr>
</table>

<div align="center">
Tabela 9: Casos de teste para teste funcional CT-03
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-03: Verificar se a aplicação é capaz de permitir o login dos perfis usuário e administrador</td>
  <td>
   <ul>
    <li>RF-07:	A aplicação deve permitir o login de administrador e login de usuário.</li>
   </ul>
  </td>
  <td>Verificar se os campos de inserir login e senha são capazes de entrar nos perfis usário e administrador; Verificar se a aplicação consegue impedir o login com credenciais incorretas;</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar no botão superior direito que corresponde a página de Login.</li>
    <li>Inserir email e senha. </li>
    <li>Se for perfil administrador, ser direcionado a página perfil administrador</li>
    <li>Se for perfil usuário, ser direcionado a página perfil usuário</li>
   </ol>
   </td>
  <td>Direcionamento para as páginas do perfil administrador ou perfil usuário.</td>
  <td>Felipe</td>
 </tr>
</table>

<div align="center">
Tabela 10: Casos de teste para teste funcional CT-04
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-04: Verificar o funcionamento dos campos para a criação de um novo usuário.</td>
  <td>
   <ul>
    <li>RF-08:	A aplicação deve permitir a criação de usuário inserindo data de nascimento e gênero.</li>
   </ul>
  </td>
  <td>Verificar se a aplicação só aceita inserção de novos usuários se os campos estão todos preenchidos; Verificar se o cadastro utilizando um email já utilizado é negado; Verificar se um usuário pode ser atualizado corretamente, refletindo, inclusive, na sua sessão atual.</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar no botão superior direito que corresponde a página de Login.</li>
    <li>Clicar em Cadastrar.</li>
    <li>Preencher os dados</li>

   </ol>
   </td>
  <td>Mensagens de erro devem aparecer caso os todos os campos não estejam preenchidos. Quando tudo estiver preenchido ao clicar em "Cadastrar" a janela Modal deve ser ativada.</td>
  <td>Ísis</td>
 </tr>
</table>

<div align="center">
Tabela 11: Casos de teste para teste funcional CT-05
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-05: Verificar se a aplicação permite que o administrador insira novas medicações. </td>
  <td>
   <ul>
    <li>RF-06: A aplicação deve permitir a alteração e adição de dados para o perfil administrador.</li>
    <li>RF-09: A aplicação deve permitir que o perfil administrador insira os efeitos adversos e esperados junto às medicações.</li>
   </ul>
  </td>
  <td>Verificar se o administrador consegue inserir novas medicações no banco de dados. </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar no botão superior direito que corresponde a pagina de Login.</li>
    <li>Realizar o login como administrador.</li>
    <li>Clicar no botão de criar medicação.</li>
    <li>Preencher o formulário com interações.</li>
    <li>Realizar edições em uma medicação.</li>
    <li>Realizar comparações para testar o registro e edição da nova medicação e suas interações.</li>
   </ol>
   </td>
  <td>Todos os itens referentes à medicação escolhida para ser modificada podem sofrer alteração.</td>
  <td>João</td>
 </tr>
</table>

<div align="center">
Tabela 12: Casos de teste para teste funcional CT-06
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-06: Verificar se a aplicação permite ver a aplicação das medicações. </td>
  <td>
   <ul>
    <li>RF-03: A aplicação deve exibir a aplicação de cada uma das medicações informadas pelo usuário.</li>
   </ul>
  </td>
  <td>Verificar se o usuário consegue ver a aplicação dos medicamentos. </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar no botão superior direito que a lista de medicamentos.</li>
    <li>Selecionar um medicamento.</li>
    <li>Verificar se é possível ver a aplicação do medicamento.</li>
   </ol>
   </td>
  <td>Deve ser possível visualizar a aplicação das medicações.</td>
  <td>Diovane</td>
 </tr>
</table>

<div align="center">
Tabela 13: Casos de teste para teste funcional CT-07
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-07: Verificar se a aplicação permite compartilhar uma comparação de medicamentos. </td>
  <td>
   <ul>
    <li>RF-05: A aplicação deve permitir compartilhar a comparação dos medicamentos.</li>
   </ul>
  </td>
  <td>Verificar se o usuário consegue compartilhar a comparação dos medicamentos. </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Digitar duas medicações nos campos "Digite aqui para comparar".</li>
    <li>Clicar no botão "Comparar".</li>
    <li>Clicar no ícone de compartilhamento</li>
    <li>Clicar em "Copiar o link"</li>
    <li>Verificar se é possível acessar a comparação através do link copiado.</li>
   </ol>
   </td>
  <td>Ser possível compartilhar a comparação de duas medicações e acessar usando o link compartilhado</td>
  <td>Diovane</td>
 </tr>
</table>

<div align="center">
Tabela 14: Casos de teste para teste funcional CT-08
</div>
<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-08: Verificar se é possível editar as medicações como usuário administrador. </td>
  <td>
   <ul>
    <li>RF-06: A aplicação deve permitir a alteração e adição de dados para o perfil administrador.</li>
   </ul>
  </td>
  <td> </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Visualizar a página Home.</li>
    <li>Clicar no botão superior direito no ícone de login.</li>
    <li>Clicar em "Listar/Editar".</li>
    <li>Selecionar um medicamento para editar.</li>
    <li>Verificar se o medicamento realmente foi editado.</li>
   </ol>
   </td>
  <td>Deve ser possível editar as medicações.</td>
  <td>Diovane</td>
 </tr>
</table>
