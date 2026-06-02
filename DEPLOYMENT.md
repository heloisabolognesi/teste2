# Guia de Deployment - Rosa dos Ventos no Vercel

## Pré-requisitos

1. **Conta no Vercel**: https://vercel.com
2. **Banco de dados MySQL em nuvem**: Recomendamos [PlanetScale](https://planetscale.com) (gratuito)
3. **GitHub**: Repositório já configurado

## Passo 1: Configurar Banco de Dados (PlanetScale)

1. Acesse https://planetscale.com e crie uma conta
2. Crie um novo banco de dados chamado `rosa_dos_ventos`
3. Obtenha as credenciais de conexão (host, usuário, senha)
4. Execute o script `schema.sql` para criar as tabelas:
   ```bash
   mysql -h <seu-host> -u <seu-usuario> -p<sua-senha> rosa_dos_ventos < schema.sql
   ```

## Passo 2: Fazer Push para GitHub

```bash
git add .
git commit -m "Preparar para deploy no Vercel"
git push origin main
```

## Passo 3: Deploy no Vercel

1. Acesse https://vercel.com/new
2. Importe o repositório `heloisabolognesi/teste2`
3. Configure as variáveis de ambiente:
   - `DB_HOST`: Host do PlanetScale
   - `DB_USER`: Usuário do PlanetScale
   - `DB_PASS`: Senha do PlanetScale
   - `DB_NAME`: `rosa_dos_ventos`
   - `JWT_SECRET`: Uma chave segura (ex: `super_segredo_rosa_dos_ventos_2026_producao`)

4. Clique em "Deploy"

## Passo 4: Verificar Deploy

Após o deploy, você receberá um URL como: `https://seu-projeto.vercel.app`

Teste:
- Frontend: https://seu-projeto.vercel.app
- API Health: https://seu-projeto.vercel.app/api

## Estrutura do Deploy

```
projeto/
├── frontend/          # React + Vite (hospedado em /)
├── backend/           # Express (código reutilizado)
├── api/
│   └── index.js       # Vercel Function (hospedado em /api/*)
├── vercel.json        # Configuração do Vercel
└── schema.sql         # Script do banco de dados
```

## Troubleshooting

### Erro de conexão com banco de dados
- Verifique se as credenciais estão corretas no Vercel
- Certifique-se de que o banco de dados foi criado com `schema.sql`
- Verifique se o PlanetScale permite conexões de fora

### Erro 404 em rotas do frontend
- O Vercel está configurado para reescrever todas as rotas para `index.html`
- Isso permite que o React Router funcione corretamente

### Erro de CORS
- CORS está habilitado globalmente no backend
- Se ainda tiver problemas, verifique a origem no frontend

## Próximos Passos

- Monitorar logs no Vercel Dashboard
- Configurar domínio customizado (opcional)
- Configurar CI/CD automático (já está configurado via GitHub)
