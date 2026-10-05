document.addEventListener("DOMContentLoaded", function () {

    /*
     * ============================
     * ELEMENTS
     * ============================
     */

    const openingScreen = document.getElementById("openingScreen");
    const beginButton = document.getElementById("beginButton");
    const invitation = document.getElementById("invitation");
    const musicButton = document.getElementById("musicButton");


    /*
     * ============================
     * TAP TO BEGIN
     * ============================
     */

    beginButton.addEventListener("click", function () {

        // Hide opening screen
        openingScreen.classList.add("hide");

        // Show invitation
        invitation.classList.remove("hidden");

        // Allow page scrolling
        document.body.style.overflowY = "auto";

        // Scroll to the top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /*
     * ============================
     * COUNTDOWN
     * ============================
     */

    // Wedding date
    const weddingDate = new Date("December 15, 2026 10:30:00").getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const difference = weddingDate - now;


        if (difference <= 0) {

            document.getElementById("days").textContent = "0";
            document.getElementById("hours").textContent = "0";
            document.getElementById("minutes").textContent = "0";
            document.getElementById("seconds").textContent = "0";

            return;
        }


        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );


        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /*
     * ============================
     * WHATSAPP RSVP
     * ============================
     */

    const rsvpButton = document.getElementById("rsvpButton");


    // Dummy WhatsApp number.
    // Replace this later with your real number.
    const whatsappNumber = "919876543210";


    const message =
        "Hello Rahul & Ananya! ❤️%0A%0A" +
        "I would like to RSVP for your wedding.%0A" +
        "Looking forward to celebrating with you!";


    rsvpButton.href =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    /*
     * ============================
     * MUSIC
     * ============================
     */

    let audio = null;
    let musicPlaying = false;


    musicButton.addEventListener("click", function () {

        /*
         * Browser security normally prevents
         * websites from automatically playing
         * music before user interaction.
         *
         * We therefore create the audio after
         * the user taps the button.
         */

        if (!audio) {

            audio = new Audio(
                "https://cdn.pixabay.com/audio/2022/03/15/audio_8c9e1a1f1d.mp3"
            );

            audio.loop = true;
            audio.volume = 0.35;

        }


        if (musicPlaying) {

            audio.pause();

            musicPlaying = false;

            musicButton.textContent = "🔊";

        } else {

            audio.play()
                .then(function () {

                    musicPlaying = true;

                    musicButton.textContent = "🔇";

                })
                .catch(function () {

                    alert(
                        "Please tap the music button again to start the music."
                    );

                });

        }

    });


    /*
     * ============================
     * INITIAL SCROLL LOCK
     * ============================
     */

    document.body.style.overflowY = "hidden";

});
