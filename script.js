// Monalisa Interativa - Projeto Alura
// Cores originais da obra de Leonardo da Vinci

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Definir tamanho do canvas
canvas.width = 600;
canvas.height = 750;

// Cores originais da Monalisa
const colors = {
    skin: '#D4A574',
    skinDark: '#B8956A',
    skinLight: '#E8D7C6',
    hair: '#3D2817',
    hairLight: '#6B4423',
    eye: '#6B4423',
    eyeWhite: '#F5EFE7',
    iris: '#8B7355',
    pupil: '#2C1810',
    dress: '#1A1410',
    background: '#8B7355',
    backgroundLight: '#A0826D',
    lips: '#A0664D',
    shadow: 'rgba(44, 24, 16, 0.3)'
};

// Variáveis para rastreamento do mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// Listener para movimento do mouse
document.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
});

// Função para desenhar o fundo
function drawBackground() {
    // Fundo principal com gradiente
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, colors.backgroundLight);
    gradient.addColorStop(0.5, colors.background);
    gradient.addColorStop(1, '#6B5344');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Efeito de envelhecimento com ruído
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3;
        const opacity = Math.random() * 0.05;
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        ctx.fillRect(x, y, size, size);
    }
}

// Função para desenhar o rosto
function drawFace() {
    ctx.save();
    
    // Rosto principal
    ctx.fillStyle = colors.skin;
    ctx.beginPath();
    ctx.ellipse(300, 280, 110, 140, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Sombras do rosto
    ctx.fillStyle = colors.skinDark;
    ctx.beginPath();
    ctx.ellipse(200, 280, 50, 120, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = colors.skinDark;
    ctx.beginPath();
    ctx.ellipse(400, 280, 45, 120, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Menton
    ctx.fillStyle = colors.skinLight;
    ctx.beginPath();
    ctx.ellipse(300, 380, 80, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Função para desenhar o cabelo
function drawHair() {
    ctx.save();
    
    // Cabelo principal
    ctx.fillStyle = colors.hair;
    ctx.beginPath();
    ctx.ellipse(300, 200, 120, 100, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Mechas de cabelo com detalhe
    for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const x = 300 + Math.cos(angle) * 120;
        const y = 200 + Math.sin(angle) * 100;
        
        ctx.fillStyle = colors.hairLight;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.ellipse(x, y, 15, 30, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
    ctx.restore();
}

// Função para desenhar os olhos com acompanhamento do cursor
function drawEyes() {
    // Olho esquerdo
    drawEye(240, 260);
    
    // Olho direito
    drawEye(360, 260);
}

// Função para desenhar um olho individual
function drawEye(eyeX, eyeY) {
    ctx.save();
    
    // Branco do olho
    ctx.fillStyle = colors.eyeWhite;
    ctx.beginPath();
    ctx.ellipse(eyeX, eyeY, 30, 35, 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Sombra no branco do olho
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();
    ctx.ellipse(eyeX + 5, eyeY + 8, 25, 30, 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Calcular direção para a íris seguir o cursor
    const angle = Math.atan2(mouseY - eyeY, mouseX - eyeX);
    const distance = 12; // Distância máxima que a íris se move
    
    const pupilX = eyeX + Math.cos(angle) * distance;
    const pupilY = eyeY + Math.sin(angle) * distance;
    
    // Íris
    ctx.fillStyle = colors.iris;
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupila
    ctx.fillStyle = colors.pupil;
    ctx.beginPath();
    ctx.arc(pupilX, pupilY, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Brilho nos olhos
    ctx.fillStyle = colors.eyeWhite;
    ctx.beginPath();
    ctx.arc(pupilX - 3, pupilY - 3, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Sombrancelha
    ctx.strokeStyle = colors.hairLight;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(eyeX - 25, eyeY - 25);
    ctx.quadraticCurveTo(eyeX, eyeY - 30, eyeX + 25, eyeY - 25);
    ctx.stroke();
    
    ctx.restore();
}

// Função para desenhar o nariz
function drawNose() {
    ctx.save();
    
    ctx.strokeStyle = colors.skinDark;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    // Linha do nariz
    ctx.beginPath();
    ctx.moveTo(300, 260);
    ctx.lineTo(300, 330);
    ctx.stroke();
    
    // Base do nariz
    ctx.beginPath();
    ctx.moveTo(295, 330);
    ctx.quadraticCurveTo(300, 335, 305, 330);
    ctx.stroke();
    
    ctx.restore();
}

// Função para desenhar a boca (sorriso)
function drawMouth() {
    ctx.save();
    
    // Lábio superior
    ctx.strokeStyle = colors.lips;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(260, 360);
    ctx.quadraticCurveTo(300, 375, 340, 360);
    ctx.stroke();
    
    // Lábio inferior
    ctx.beginPath();
    ctx.moveTo(265, 360);
    ctx.quadraticCurveTo(300, 368, 335, 360);
    ctx.stroke();
    
    // Preenchimento dos lábios
    ctx.fillStyle = colors.lips;
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(260, 360);
    ctx.quadraticCurveTo(300, 375, 340, 360);
    ctx.quadraticCurveTo(300, 368, 265, 360);
    ctx.fill();
    
    ctx.globalAlpha = 1;
    ctx.restore();
}

// Função para desenhar o vestido
function drawDress() {
    ctx.save();
    
    ctx.fillStyle = colors.dress;
    ctx.beginPath();
    ctx.moveTo(220, 400);
    ctx.lineTo(150, 750);
    ctx.lineTo(450, 750);
    ctx.lineTo(380, 400);
    ctx.quadraticCurveTo(300, 420, 220, 400);
    ctx.fill();
    
    // Detalhes do vestido
    ctx.strokeStyle = colors.background;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.5;
    
    for (let i = 0; i < 20; i++) {
        const x = 150 + (300 / 20) * i;
        const y = 400 + ((350 / 20) * i);
        ctx.beginPath();
        ctx.moveTo(x, 400);
        ctx.lineTo(x + 10, y);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
    ctx.restore();
}

// Função para desenhar as mãos
function drawHands() {
    ctx.save();
    
    // Mão esquerda
    ctx.fillStyle = colors.skin;
    ctx.beginPath();
    ctx.ellipse(180, 480, 35, 50, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Mão direita
    ctx.beginPath();
    ctx.ellipse(420, 480, 35, 50, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Dedos
    for (let i = 0; i < 5; i++) {
        // Dedos da mão esquerda
        const x1 = 150 + i * 8;
        const y1 = 520 + i * 5;
        ctx.fillStyle = colors.skin;
        ctx.beginPath();
        ctx.ellipse(x1, y1, 6, 20, 0.2, 0, Math.PI * 2);
        ctx.fill();
        
        // Dedos da mão direita
        const x2 = 450 - i * 8;
        const y2 = 520 + i * 5;
        ctx.beginPath();
        ctx.ellipse(x2, y2, 6, 20, -0.2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.restore();
}

// Função para desenhar o marco (background distante)
function drawBackground_Details() {
    ctx.save();
    
    // Montanhas ao fundo
    ctx.fillStyle = '#4A3728';
    ctx.beginPath();
    ctx.moveTo(0, 450);
    ctx.quadraticCurveTo(150, 400, 300, 420);
    ctx.quadraticCurveTo(450, 440, 600, 430);
    ctx.lineTo(600, 750);
    ctx.lineTo(0, 750);
    ctx.fill();
    
    // Camadas de montanha
    ctx.fillStyle = '#6B5344';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, 500);
    ctx.quadraticCurveTo(200, 450, 400, 480);
    ctx.quadraticCurveTo(500, 500, 600, 490);
    ctx.lineTo(600, 750);
    ctx.lineTo(0, 750);
    ctx.fill();
    
    ctx.globalAlpha = 1;
    ctx.restore();
}

// Função principal de animação
function animate() {
    // Limpar canvas
    drawBackground();
    
    // Desenhar elementos da Monalisa
    drawBackground_Details();
    drawDress();
    drawHands();
    drawHair();
    drawFace();
    drawEyes(); // Com acompanhamento do cursor
    drawNose();
    drawMouth();
    
    // Continuar animação
    requestAnimationFrame(animate);
}

// Iniciar animação
animate();
