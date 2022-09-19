# projeto10-repoprovas

# Observações gerais:

- Todas as informações sensíveis, serão criptografadas

- Email de cadastro de usuário é único

- Toda a autenticação foi feita com [jwt](https://www.npmjs.com/package/jsonwebtoken)

# Rotas de criação e autenticação de usuários:

## Rota <span style="color:yellow"> **POST** </span>/signup

Essa é uma rota não autenticada. Sua função é criar novos usuários para a plataforma.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email para cadastro", //string
  "password": "senha de no mínimo 10 caracteres", //string
  "confirmation": "senha de no mínimo 10 caracteres" //string
}
```

## Rota <span style="color:yellow"> **POST** </span>/signin

Essa é uma rota não autenticada. Sua função é autenticar novos usuários para o uso da plataforma.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "email": "email de cadastro do usuário", //string
  "password": "senha de cadastro do usuário" //string
}
```
- a requisição responderá com o token de acesso.

# Rotas de tests:

## Rota <span style="color:yellow"> **POST** </span>/tests

Essa é uma rota autenticada com um header http do tipo "Authorization". Sua função é criar entrads contendo dados de provas antigas.

O Body da requisição deve ser feito no seguinte formato:

```json
{
  "name": "título identificação da prova", //string
  "pdfUrl": "url de acesso ao pdf contendo a prova", //string
  "categoryId": "Identificador do tipo da prova", //number
  "teacherId": "Identificador da pessoa instrutora responsável pela prova", //number
  "disciplineId": "Identificador da matéria da prova" //number
}
```

## Rota <span style="color:yellow"> **GET** </span>/tests/termsview

Essa é uma rota autenticada com um header http do tipo "Authorization". Sua função é listar todas as provas agrupadas por período.

A resposta da requisição virá no seguinte formato:

```json
[
  {
    "id": 1,
    "number": 1, //PERÍODO
    "Disciplines": [
      {
        "id": 1,
        "name": "HTML e CSS",
        "termId": 1,
        "TeacherDisciplines": [
          {
            "id": 1,
            "teacherId": 1,
            "disciplineId": 1,
            "teachers": {
              "id": 1,
              "name": "Diego Pinho"
            },
            "Tests": []
          }
        ]
      },
      {
        "id": 4,
        "name": "Humildade",
        "termId": 1,
        "TeacherDisciplines": [
          {
            "id": 4,
            "teacherId": 2,
            "disciplineId": 4,
            "teachers": {
              "id": 2,
              "name": "Bruna Hamori"
            },
            "Tests": []
          }
        ]
      }
    ]
  }, ...
]
```

## Rota <span style="color:yellow"> **GET** </span>/tests/teachersview

Essa é uma rota autenticada com um header http do tipo "Authorization". Sua função é listar todas as provas agrupadas por pessoa instrutora.

A resposta da requisição virá no seguinte formato:

```json
[
  {
    "id": 1,
    "name": "Diego Pinho",
    "terms": [
      {
        "term": {
          "id": 1,
          "number": 1,
          "Disciplines": [
            {
              "name": "HTML e CSS",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            },
            {
              "name": "Humildade",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            }
          ]
        }
      },
      {
        "term": {
          "id": 2,
          "number": 2,
          "Disciplines": [
            {
              "name": "JavaScript",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            },
            {
              "name": "Planejamento",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            }
          ]
        }
      },
      {
        "term": {
          "id": 3,
          "number": 3,
          "Disciplines": [
            {
              "name": "React",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            },
            {
              "name": "Autoconfiança",
              "TeacherDisciplines": [
                {
                  "Tests": []
                }
              ]
            }
          ]
        }
      }
    ]
  }, ...
]
```

#