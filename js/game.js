const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 清除画布并设置背景颜色
ctx.fillStyle = "#f0f0f0";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 绘制玩家
const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: "#00f"
};

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 绘制敌人
const enemy = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 50,
    height: 50,
    color: "#f00"
};

function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// 更新玩家位置
function updatePlayer() {
    // 添加键盘事件，控制玩家移动
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' && player.x > 0) {
            player.x -= 1;
        } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
            player.x += 1;
        }
    });
}

// 更新敌人位置
function updateEnemy() {
    enemy.y += 5; // 敌人向下移动
    if (enemy.y > canvas.height) {
        enemy.y = 0; // 重新生成敌人
        enemy.x = Math.random() * (canvas.width - 50);
    }
}

// 碰撞检测
function checkCollision() {
    if (player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y) {
        alert("游戏结束！");
        resetGame();
    }
}

// 重置游戏
function resetGame() {
    enemy.y = 0;
    player.x = canvas.width / 2 - 25;
}

// 游戏主循环
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawEnemy();
    updatePlayer();
    updateEnemy();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// 键盘事件处理
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft' && player.x > 0) {
//         player.x -= 10;
//     } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
//         player.x += 10;
//     }
// });

// 触摸事件处理（适用于移动设备）
// canvas.addEventListener('touchmove', function(event) {
//     const touch = event.touches[0];
//     player.x = touch.clientX - player.width / 2;
// });
