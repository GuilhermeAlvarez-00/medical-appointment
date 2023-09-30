# Agendamento de consulta médica

### **Funcionalidades**

## **Cadastro de Usuário**

- [x] Deve ser possível o usuário realizar um cadastro
  - [x] O usuário não precisa estar autentiacado no sistema para se cadastrar
  - [x] Não deve ser possível realizar o cadastro de um usuário sem username e senha
  - [x] Não deve ser possível realizar um cadastro se username já existente
  - [x] Não deve ser possível o usuário cadastrar a permissão de admin

## **Cadastro de Especialidade**

- [x] Deve ser possível um usuário cadastrar uma especialidade
  - [x] O usuário precisa estar autenticado na aplicação.
  - [x] Não deve ser possível realizar o cadastro de uma especialidade já existente, ou seja, com o mesmo nome.
  - [x] O usuário precisa ter permissão de administrador.
  - [x] Não deve ser possível cadastrar uma especialidade com nome vazio

## **Cadastro de Médico**

- [ ] Deve ser possível um usuário cadastrar um médico
  - [ ] O médico deve possuir um CRM com 6 digitos.
  - [ ] O médico deve estar atrelado a um usuario.
  - [ ] O médico deve ter somente uma especialidade.
  - [ ] Não deve ser possivel cadastrar um medico sem CRM.
