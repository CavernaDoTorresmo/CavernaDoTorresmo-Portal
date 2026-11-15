# Caverna do Torresmo — Portal Nova Era v6

Novo portal gamer inspirado no dashboard neon enviado como referência e com a arte do calendário enviada pelo criador usada na contagem regressiva.

## Abrir o projeto

1. Extraia o ZIP inteiro.
2. Abra `index.html` no navegador (Chrome, Firefox ou Edge).
3. Use `countdown.html` para a página especial do calendário.
4. Use `obs.html` como fonte de Navegador do OBS, com largura **1920** e altura **1080** (arquivo local). Se necessário, marque **Atualizar navegador quando a cena se tornar ativa**.
5. Ajuste data e links em `assets/js/config.js` caso haja uma nova comunicação oficial.

## Páginas

- `index.html` — homepage estilo dashboard / portal gamer.
- `countdown.html` — calendário, foto enviada e cronômetro real em tempo real.
- `obs.html` — layout 16:9 para a live, usando a imagem do calendário.
- `noticias.html` — posts com fontes oficiais e sem dados fabricados.
- `downloads.html` — link para o Save Editor no GitHub.
- `sobre.html` — sobre a Caverna e declaração de independência.

## Lançamento

19/11/2026 à meia-noite no horário local de São Paulo (UTC−3), conforme suporte Rockstar: https://support.rockstargames.com/articles/29jV3Cv2cCgvwM1XgtMO5o/grand-theft-auto-vi-regional-pre-load-and-release-times-on-playstation-5-and-xbox-series-x-or-s

Contador calcula do relógio do dispositivo; `FALTAM X DIAS` muda automaticamente, e ao chegar a zero mostra uma mensagem de lançamento. O tempo é salvo como ISO com fuso horário para evitar erros de localização.

## Publicação

GitHub Pages / Cloudflare Pages — sem backend e sem chaves de API. O visual funciona sem hospedagem. As fontes do Google são opcionais; o CSS inclui fontes de reserva locais.

**Importante:** projeto independente de fãs, não oficial, sem afiliação com a Rockstar. A arte do calendário foi fornecida pelo usuário. Os elementos visuais restantes foram gerados para este projeto.


## Versão 8 — polimento de lançamento
- Partimos da v6 aprovada e mantivemos intactos os componentes de navegação e o layout principal.
- 10 neons independentes nas laterais (apenas em monitores com espaço lateral suficiente); imagens WEBP com transparência, sem cortes ou sobreposição ao portal.
- Calendário restaurado e localizado em português sobre a textura original, sem notas retangulares artificiais.
- Letreiro de live neon com cintilação discreta no OBS; respeita preferência por movimento reduzido.
- Contador continua automático e configurável em assets/js/config.js.


## Versão 10 — laterais com mural neon
A arte aprovada de Vice City/Caverna foi aplicada como papel de parede contínuo nas duas laterais externas, mantendo o portal, o OBS e o contador inalterados.
A distribuição se adapta à largura real do navegador, não ao tamanho em polegadas do monitor; em janelas estreitas, as laterais são ocultadas para preservar a leitura.
Arquivo utilizado: `assets/images/neon-vice-city-mural.webp`.


## Versão 11 — laterais sem emendas
- Mesma arte neon da versão 10, agora exibida apenas **uma vez em cada lateral**, preenchendo toda a altura com `background-size: cover` e `background-repeat: no-repeat`.
- Removidas as linhas horizontais resultantes de repetições em blocos.
- Imagens alinhadas de forma ligeiramente diferente em cada lado para dar variedade, sem esticar a proporção. Uma cópia com fundo escuro sólido elimina transparências indesejadas nas bordas.
- Nenhuma mudança no portal, countdown, OBS ou demais páginas.
