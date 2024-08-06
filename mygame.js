const object = document.getElementById('object');
const joystict = document.getElementById('joystict');

let isDragging = false;
let joystictCenter = { x: joystict.offsetWidth / 2, y: joystict.offsetHeight / 2 };
let moveX = 0;
let moveY = 0;

joystict.addEventListener('touchstart', function(e) {
    isDragging = true;
    handleTouch(e);
});

joystict.addEventListener('touchmove', function(e) {
    if (isDragging) {
        handleTouch(e);
    }
});

joystict.addEventListener('touchend', function(e) {
    isDragging = false;
});

function handleTouch(e) {
    const touch = e.touches[0];
    const joystictRect = joystict.getBoundingClientRect();
    const joystictCenterX = joystictRect.left + joystictCenter.x;
    const joystictCenterY = joystictRect.top + joystictCenter.y;
    
    const dx = touch.clientX - joystictCenterX;
    const dy = touch.clientY - joystictCenterY;
    
    const maxDistance = joystict.offsetWidth / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const scale = Math.min(1, distance / maxDistance);
    moveX = dx * scale;
    moveY = dy * scale;
    
}

function updatePosition() {
    const joystictRect = joystict.getBoundingClientRect();
    /*const objectLeft = joystictRect.left + moveX - (object.offsetWidth / 2);
    const objectTop = joystictRect.top + moveY - (object.offsetHeight / 2);
    
    object.style.left = `${objectLeft}px`;
    object.style.top = `${objectTop}px`;*/
    
    object.style.transform = `translate(${moveX}px, ${moveY}px)`;
    requestAnimationFrame(updatePosition);

}
requestAnimationFrame(updatePosition);