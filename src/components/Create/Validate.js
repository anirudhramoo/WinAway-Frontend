const validate = (error, input) => {
  if (!input.title) {
    error.title = "You must include a title";
  }
  if (input.title.trim().length < 3) {
    error.title = "The title must be at least 3 Characters";
  }
  if (input.title.trim().length > 200) {
    error.title = "The title must be less than 200 characters";
  }
  //--------------------------------------------------

  if (!input.value) {
    error.value = "You must include a valuation";
  }
  if (input.value < 10) {
    error.value = "The value must be at least 10 dollars";
  }
  if (input.value.length > 10000000) {
    error.value = "Whoa there, you can only give 10,000,000 dollars";
  }
  //--------------------------------------------------

  if (!input.prize) {
    error.prize = "You must include a prize description";
  }
  if (input.prize.trim() < 10) {
    error.prize = "The prize description must be at least 5 characters";
  }
  if (input.prize.trim().length > 255) {
    error.prize = "The prize description can only be upto 255 characters";
  }
  //--------------------------------------------------

  if (!input.contact) {
    error.contact = "You must include how you will contact the winner/s.";
  }
  if (input.contact.trim() < 3) {
    error.contact = "The contact description must be at least 3 characters";
  }
  if (input.contact.trim().length > 255) {
    error.contact = "The contact description can only be upto 255 characters";
  }
  //--------------------------------------------------

  if (!input.image) {
    error.image = "You must include an image.";
  }
  //--------------------------------------------------

  if (input.expiryDate < Date.now()) {
    error.expiryDate = "Your expiry date is too early";
  }

  if (input.expiryDate > Date.now() + 365 * 24 * 60 * 60000) {
    error.expiryDate = "Your expiry date is too late. Choose an earlier date";
  }
  //--------------------------------------------------

  if (input.enter.length == 0) {
    error.enter = "Your must have at least one way to enter";
  }

  for (let i = 0; i < input.enter.length; i++) {
    if (input.enter[i].requirements.length == 0) {
      error.enter = "There are no requirements in at least one field";
      break;
    }
    if (input.enter[i].draw < 1) {
      error.enter = "There must be at least 1 draw added.";
      break;
    }

    for (let j = 0; j < input.enter[i].requirements.length; j++) {
      if (input.enter[i].requirements[j].trim().length < 2) {
        error.enter = "One of your requirements has a length less than 2.";
      }
      if (input.enter[i].requirements[j].trim().length > 200) {
        error.enter = "One of your requirements has a length greater than 200.";
      }
    }
  }
};

export default validate;
