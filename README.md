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

- [x] Deve ser possível um usuário cadastrar um médico
  - [x] O médico deve possuir um CRM com 6 digitos.
  - [x] O médico deve estar atrelado a um usuario.
  - [x] O médico deve ter somente uma especialidade.
  - [x] Não deve ser possivel cadastrar um medico sem CRM.
  - [x] Não deve ser possivel cadastrar o mesmo CRM mais de uma vez.

## **Cadastro de Informações do médico**

- [ ] Deve ser possível cadastrar a informação de médico
  - [ ] O médico deve estar cadastrado.
  - [ ] O médico deve estar autenticado.
  - [ ] Não deve ser possível ter mais de um registro de informação por médico.
  - [ ] O horário de término não deve ser menor que o horário de inicio
  - [ ] A duração da consulta não pode ser menor ou igual a zero.
