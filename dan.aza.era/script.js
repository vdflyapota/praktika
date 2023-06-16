      
      
      function checkPasswordStrength() {
        const password = document.getElementById('password').value;
        const strengthMeter = document.getElementById('strength-meter');
        const strengthText = document.getElementById('strength-text');
        const strengthReasons = document.getElementById('strength-reasons');

        const strength = calculatePasswordStrength(password);
        const reasons = getStrengthReasons(password);


        
        strengthMeter.style.backgroundColor = getStrengthColor(strength);

        //update strength text based on the strength level
        strengthText.innerHTML = getStrengthText(strength);

        //display reasons for weak passwords
        strengthReasons.innerHTML = '';
        if (strength === 0 && reasons.length > 0) {
          const reasonsList = document.createElement('ul');
          reasons.forEach(reason => {
            const reasonItem = document.createElement('li');
            reasonItem.textContent = reason;
            reasonsList.appendChild(reasonItem);
          });
          strengthReasons.appendChild(reasonsList);
        }
      }

      function calculatePasswordStrength(password) {
        if (password.length >= 0 && password.length <= 8) {
          return 0; 
        } else if (password.length >= 8 && password.length <= 12) {
          return 1; 
        } else if (password.length >= 12 && password.length <= 32) {
          return 2; 
        }
      }


      function getStrengthReasons(password) {
        

        const reasons = [];

        //reasons
        if (!/[a-z]/.test(password)) {
          reasons.push('Missing lowercase letters');
        }

        if (!/[A-Z]/.test(password)) {
          reasons.push('Missing uppercase letters');
        }

        if (!/[0-9]/.test(password)) {
          reasons.push('Missing numbers');
        }

        if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]/.test(password)) {
          reasons.push('Missing special characters');
        }

        return reasons;
      }

      function getStrengthColor(strength) {
        if (strength === 0) {
          return 'red'; // красный для слабого
        } else if (strength === 1) {
          return '#ff8c00'; // оранжевый для медиум
        } else if (strength === 2) {
          return '#0f0'; // зеленый для стронг
        }
      }



      function getStrengthText(strength) {
        const strengthTexts = ['Weak', 'Medium', 'Strong'];
        return strengthTexts[strength];
      }

      function generatePassword() {
        const length = 16; //length of the created pass
        const characterTypes = {
          uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          lowercase: 'abcdefghijklmnopqrstuvwxyz',
          numbers: '0123456789',
          symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
        };
        
        let password = '';
        
        for (let i = 0; i < length; i++) {
          const randomCharType = getRandomElement(Object.keys(characterTypes));
          const randomCharList = characterTypes[randomCharType];
          const randomChar = getRandomElement(randomCharList);
          password += randomChar;
        }
        
        document.getElementById('password').value = password;
        checkPasswordStrength();
      }

      function getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
      }

      function togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const toggleButton = document.getElementById('toggle-password');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          toggleButton.textContent = 'Hide Password';
        } else {
          passwordInput.type = 'password';
          toggleButton.textContent = 'Show Password';
        }
      }



      //atbash decoder
      function atbashDecode(str) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < str.length; i++) {
          const char = str[i];
          const index = alphabet.indexOf(char.toUpperCase());
          if (index !== -1) {
            const decodedChar = alphabet[25 - index];
            result += (char === char.toUpperCase()) ? decodedChar : decodedChar.toLowerCase();
          } else {
            result += char;
          }
        }
        return result;
      }

      //atbash encoder
      function atbashEncode(str) {
        return atbashDecode(str);
      }

      // event listener decode button
      document.getElementById('decode').addEventListener('click', function () {
        const input = document.getElementById('input').value;
        const output = atbashDecode(input);
        document.getElementById('output').value = output;
      });

      // event listener  encode button
      document.getElementById('encode').addEventListener('click', function () {
        const input = document.getElementById('input').value;
        const output = atbashEncode(input);
        document.getElementById('output').value = output;
      });



