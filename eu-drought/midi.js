let first = true;
let secondsSinceInteraction = 0;

function setupController() {
  WebMidi.enable()
    .then(onEnabled)
    .catch((err) => alert(err));
}

// gets called when a MIDI control change message is intercepted
function allCC(e) {
  switch (e.controller.number) {
    case 32: {
      year = 2000 + floor(22 * e.value);
      break;
    }
    case 33: {
      centres = recalculateCentres();
      break;
    }
    case 34: {
      break;
    }
    case 35: {
      break;
    }
    case 36: {
      break;
    }
    case 37: {
      break;
    }
    case 38: {
      break;
    }
    case 39: {
      break;
    }
  }

  //pass on to group CC
  // customCC(e);
}

// ===================================
// gets called by MIDI library once MIDI enabled
function onEnabled() {
  console.log("enabled");
  // Display available MIDI input devices
  if (WebMidi.inputs.length < 1) {
  } else {
    WebMidi.inputs.forEach((device, index) => {
      console.log(`${index}: ${device.name}`);
    });
  }
  myController = WebMidi.inputs[0];
  myController.channels[1].addListener("controlchange", allCC);
}
