// Define the Diffie-Hellman parameters
const p = 23;
const g = 5;

// Calculate the shared secret using the private key and public key
function calculateSharedSecret(privateKey, publicKey) {
  return Math.pow(publicKey, privateKey) % p;
}

// Update the shared secret when the user submits their private key
function updateSharedSecret() {
  const alicePrivateKey = parseInt(document.getElementById("alice-private-key").value);
  const bobPrivateKey = parseInt(document.getElementById("bob-private-key").value);

  // Generate random public keys for Alice and Bob
  const alicePublicKey = Math.pow(g, alicePrivateKey) % p;
  const bobPublicKey = Math.pow(g, bobPrivateKey) % p;

  // Calculate the shared secret for both Alice and Bob
  const aliceSharedSecret = calculateSharedSecret(alicePrivateKey, bobPublicKey);
  const bobSharedSecret = calculateSharedSecret(bobPrivateKey, alicePublicKey);

  // Display the shared secret for both Alice and Bob
  document.getElementById("shared-secret").innerHTML =  `Alice's shared secret: ${aliceSharedSecret}<br>Bob's shared secret: ${bobSharedSecret}`;
}

// Add event listeners to the submit buttons
document.getElementById("submit2").addEventListener("click", updateSharedSecret);

/*
 -----------------------------------------------------------------------------------------
*/
function compute() {
  const sharedPublicColorPicker= document.getElementById("shared-public-color-picker").value;
  const alicePrivateColorPicker = document.getElementById("alice-private-color-picker").value;
  const bobPrivateColorPicker = document.getElementById("bob-private-color-picker").value;

  const publicColorRGB= hexToRgb(sharedPublicColorPicker);
  const aliceRGB = hexToRgb(alicePrivateColorPicker);
  const alicePulicColorRGB= mixColors(publicColorRGB,aliceRGB,0.5);
  
  const bobRGB = hexToRgb(bobPrivateColorPicker);
  const bobPulicColorRGB= mixColors(publicColorRGB,bobRGB,0.5);
  const bobSharedPrivateColorRGB = mixColors(alicePulicColorRGB,bobRGB,2/3);
  const aliceSharedPrivateColorRGB = mixColors(bobPulicColorRGB,aliceRGB,2/3);

  const alicePrivateColor= document.getElementById('alice-private-color');
  const alicePulicColor= document.getElementById('alice-public-color');
  const aliceExchangedColor= document.getElementById('alice-exchanged-color');
  const aliceSharedPrivateColor= document.getElementById('alice-shared-private-color');
  
  const bobPrivateColor= document.getElementById('bob-private-color');
  const bobPulicColor= document.getElementById('bob-public-color');
  const bobExchangedColor= document.getElementById('bob-exchanged-color');
  const bobSharedPrivateColor= document.getElementById('bob-shared-private-color');

  function updateColor() {
    alicePrivateColor.style.fill = `rgb(${aliceRGB.r}, ${aliceRGB.g}, ${aliceRGB.b})`;
    alicePulicColor.style.fill = `rgb(${alicePulicColorRGB.r}, ${alicePulicColorRGB.g}, ${alicePulicColorRGB.b})`;
    aliceExchangedColor.style.fill = `rgb(${bobPulicColorRGB.r}, ${bobPulicColorRGB.g}, ${bobPulicColorRGB.b})`;
    aliceSharedPrivateColor.style.fill = `rgb(${Math.ceil(aliceSharedPrivateColorRGB.r)}, ${Math.ceil(aliceSharedPrivateColorRGB.g)}, ${Math.ceil(aliceSharedPrivateColorRGB.b)})`;

    bobPrivateColor.style.fill = `rgb(${bobRGB.r}, ${bobRGB.g}, ${bobRGB.b})`;
    bobPulicColor.style.fill = `rgb(${bobPulicColorRGB.r}, ${bobPulicColorRGB.g}, ${bobPulicColorRGB.b})`;
    bobExchangedColor.style.fill = `rgb(${alicePulicColorRGB.r}, ${alicePulicColorRGB.g}, ${alicePulicColorRGB.b})`;
    bobSharedPrivateColor.style.fill = `rgb(${ Math.ceil(bobSharedPrivateColorRGB.r)}, ${ Math.ceil(bobSharedPrivateColorRGB.g)}, ${ Math.ceil(bobSharedPrivateColorRGB.b)})`;
  }
  updateColor();
}
function mixColors(color1, color2, alpha) {
  const mixedColor = {
    r: Math.round(color1.r * alpha + color2.r * (1 - alpha)),
    g: Math.round(color1.g * alpha + color2.g * (1 - alpha)),
    b: Math.round(color1.b * alpha + color2.b * (1 - alpha))
  };
  return mixedColor;
}

function hexToRgb(hex) {
  // Convert hex color to RGB color
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

document.getElementById("submit").addEventListener("click", compute);

