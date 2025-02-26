const bcrypt = require("bcryptjs");

const storedHash = "$2b$10$b5OKgwcCfjJhnjT2.TvKWui3CIqDRmN3v3p9w61F4Wm2WAsIjcVge"; // Hash en la BD
const plainPassword = "1234"; // La contraseña que ingresaste en el login

async function testPassword() {
  const isMatch = await bcrypt.compare(plainPassword, storedHash);

  if (isMatch) {
    console.log("✅ La contraseña coincide");
  } else {
    console.log("❌ La contraseña NO coincide");
  }
}

testPassword();
