# Game Design Document — World Invaders 2.0

**Plataforma:** Mobile (Ionic + Capacitor)
**Gênero:** Arcade / Survival Shooter
**Orientação:** Retrato (portrait)
**Versão do documento:** 1.0

---

## 1. Visão Geral

World Invaders 2.0 é um shooter arcade de sobrevivência para mobile. O jogador enfrenta ondas de inimigos que o perseguem, acumula eliminações e moedas, e usa essas moedas para desbloquear upgrades permanentes na loja — criando um loop de progressão do tipo roguelite.

### 1.1 Pitch

> Sobreviva o máximo possível, atire nos invasores, colete upgrades temporários no meio da partida e gaste suas moedas para voltar mais forte.

### 1.2 Pilares de Design

1. **Sessões curtas e viciantes** — partidas rápidas, ideais para mobile.
2. **Progressão persistente** — cada derrota gera moedas que alimentam a loja.
3. **Feedback tátil e visual** — shake de câmera ao tomar dano, respostas imediatas às ações do jogador.

---

## 2. Game Loop

```
Entra no jogo
   ↓
Mata inimigos (acumula eliminações e pontuação)
   ↓
Perde (vida chega a 0)
   ↓
Ganha moedas proporcionais às kills da partida
   ↓
Compra upgrades na loja
   ↓
Entra no jogo novamente (mais forte)
```

**Loop de curto prazo (in-game):** atirar → eliminar inimigos → coletar upgrades temporários → sobreviver.
**Loop de longo prazo (meta):** acumular moedas → desbloquear upgrades → aumentar recorde de eliminações.

---

## 3. Mecânicas Principais

### 3.1 Player (Singleton)

O jogador é gerenciado por um **Singleton** que persiste os dados entre cenas e partidas.

**Estado do PlayerSingleton:**

| Propriedade | Tipo | Descrição | Persistência |
|---|---|---|---|
| `vidaMaxima` | number | Vida máxima do jogador | Persistente |
| `vidaAtual` | number | Vida atual na partida | Runtime |
| `pontuacao` | number | Pontuação da partida atual | Runtime |
| `dinheiro` | number | Moedas acumuladas (moeda da loja) | Persistente |
| `eliminacoesAtuais` | number | Kills na partida atual | Runtime |
| `maiorNumeroEliminacoes` | number | Recorde de kills (high score) | Persistente |
| `upgradesDesbloqueados` | string[] | Lista de upgrades comprados na loja | Persistente |

**Regras:**
- Dados persistentes são salvos localmente (ex.: Capacitor Preferences / localStorage).
- Ao final de cada partida: `dinheiro += eliminacoesAtuais * valorPorKill` e atualização do recorde se `eliminacoesAtuais > maiorNumeroEliminacoes`.
- `vidaAtual` é resetada para `vidaMaxima` no início de cada partida.

### 3.2 Inimigos

**Tipo 1 — Perseguidor (Chaser)**

| Atributo | Valor inicial (sugestão) |
|---|---|
| Comportamento | Move-se em linha reta em direção à posição atual do player |
| Vida | 1 hit |
| Dano ao colidir | 1 de vida do player |
| Spawn | Nas bordas da tela, em intervalos que diminuem com o tempo |

- IA simples: vetor normalizado `(playerPos - enemyPos)` multiplicado pela velocidade.
- Ao colidir com o player: causa dano, dispara o **shake de câmera** e é destruído (ou empurrado, a definir em playtest).
- Dificuldade escala com o tempo: velocidade e taxa de spawn aumentam gradualmente.

### 3.3 Tiro

- O player atira projéteis que destroem inimigos ao colidir.
- Disparo automático ou por toque (a definir em playtest — automático é recomendado para mobile).
- Projéteis são destruídos ao sair da tela ou ao acertar um alvo.
- O tiro também é a forma de **coletar upgrades temporários** (ver 3.4).

### 3.4 Upgrades Temporários (In-Game)

- Durante a partida, **caixas de upgrade** aparecem em posições aleatórias da arena.
- Para ativar, o jogador precisa **acertar um tiro** na caixa.
- O upgrade ativado dura um **tempo limitado** (ex.: 10–15 segundos) e depois expira.
- Apenas upgrades já **desbloqueados na loja** podem aparecer durante a partida.
- Feedback visual do tempo restante (ex.: barra ou ícone piscando ao final).

### 3.5 Loja (Meta-progressão)

- Acessada fora da partida (menu principal ou tela de game over).
- Usa o `dinheiro` acumulado para **desbloquear upgrades** permanentemente.
- Upgrade desbloqueado = passa a aparecer como caixa de upgrade dentro das partidas.

**Catálogo inicial:**

| Upgrade | Efeito | Preço (sugestão) |
|---|---|---|
| **Multi Shot** | Dispara 3 projéteis em leque em vez de 1 | 100 |
| **Torreta** | Invoca uma torreta estacionária que atira automaticamente nos inimigos próximos | 250 |
| **Tiro Girando** | Projéteis orbitam o player, causando dano por contato | 400 |

> Possibilidade futura: níveis de upgrade (ex.: Multi Shot II com 5 projéteis).

---

## 4. Features Mobile (Ionic + Capacitor)

### 4.1 Câmera / Shake ao Tomar Dano

- Ao receber dano, a câmera do jogo executa um **screen shake** (deslocamento aleatório decrescente por ~0.3s).
- Complementado por **vibração háptica** do dispositivo (Capacitor Haptics) para reforçar o feedback.
- Flash vermelho sutil na tela (overlay) como reforço visual do dano.

### 4.2 Controles

- **Movimento:** joystick virtual (lado esquerdo da tela) ou arrastar o dedo.
- **Tiro:** automático na direção do inimigo mais próximo (recomendado) ou botão dedicado.
- UI touch-friendly: alvos de toque grandes, HUD nos cantos.

---

## 5. Interface (Telas)

| Tela | Conteúdo |
|---|---|
| **Menu Principal** | Jogar, Loja, recorde de eliminações, dinheiro atual |
| **Gameplay (HUD)** | Barra de vida, pontuação, contador de kills, ícones de upgrades ativos com timer |
| **Game Over** | Kills da partida, moedas ganhas, recorde (novo recorde destacado), botões Jogar Novamente / Loja / Menu |
| **Loja** | Lista de upgrades com ícone, descrição, preço e estado (bloqueado/desbloqueado) |

---

## 6. Economia (Valores Iniciais para Balanceamento)

| Parâmetro | Valor sugerido |
|---|---|
| Moedas por eliminação | 5 |
| Pontos por eliminação | 10 |
| Vida máxima inicial | 3 |
| Duração de upgrade temporário | 12s |
| Intervalo inicial de spawn de inimigos | 2s (reduz até 0.5s) |
| Intervalo de spawn de caixas de upgrade | 20s |

> Todos os valores devem ser centralizados em um arquivo de configuração para facilitar o balanceamento.

---

## 7. Arquitetura Técnica (Resumo)

- **Framework:** Ionic + Capacitor (build mobile), engine de render a definir (Canvas 2D / Phaser dentro do webview).
- **PlayerSingleton:** classe única com estado do jogador, exposta globalmente ou via serviço injetável.
- **Persistência:** Capacitor Preferences (chave-valor JSON) para dinheiro, recorde e upgrades desbloqueados.
- **Sistemas separados:** `EnemySpawner`, `ProjectileManager`, `UpgradeBoxSpawner`, `CameraShake`, `ShopService`.
- **Plugins Capacitor:** Haptics (vibração), Preferences (save), opcionalmente Status Bar / Screen Orientation (travar portrait).

---

## 8. Roadmap Sugerido

1. **MVP:** player + movimento + tiro + inimigo perseguidor + vida/dano + game over.
2. **Feedback:** camera shake, haptics, HUD.
3. **Meta:** singleton persistente, moedas por kill, loja com 3 upgrades.
4. **Upgrades in-game:** caixas atiráveis + timers de duração.
5. **Polimento:** balanceamento, sons, partículas, novo tipo de inimigo (futuro).
