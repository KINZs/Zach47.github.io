var tweetURL;
function getPlayerQuote() {
  var randomGet = Math.floor(Math.random()*quotes.length);
  document.getElementById("playerQuote").innerHTML = quotes[randomGet].quote;
  document.getElementById("playerName").innerHTML = quotes[randomGet].name;
  tweetURL = 'https://twitter.com/intent/tweet?text=' + quotes[randomGet].quote + ' - ' + quotes[randomGet].name;
}
		
window.onload = quotes;
		
function tweet() {
  window.open(tweetURL);
}
var quotes = [
  {
    name: "Haru",
    quote: "Holy fuck this joink guy triggered me"
  },
  {
    name: "Rifk",
    quote: "Legit everyone thinks I'm retarded"
  },
  {
    name: "Kenneth",
    quote: "Zane used to play a lot on KZ-Climb servers and had records on most of the maps, but he couldnt even do a 260."
  },
  {
    name: "Skodna",
    quote: "ive seen a video today where a guy used an alive carp to make it suck his dick and you're that carp right now. stop it, dont be that carp."
  },
  {
    name: "Skodna",
    quote: "randomly hit 9 380s lol yet im the one getting accused"
  },
  {
    name: "Everyone",
    quote: "OSsloth"
  },
  {
    name: "Sachburger",
    quote: "Friggz = cheater, zpook = cheater, friggz = zpook, cheater = cheater. Using this logic we can determine that skodna = friggz = zpook"
  },
  {
    name: "LUq",
    quote: "If you wave dash prior to a bhop..."
  },
  {
    name: "Haru",
    quote: "-͜ʖ-"
  },
  {
    name: "Chuckles",
    quote: "Yeah Buddy, you're fucking godlike!"
  },
  {
    name: "Chuckles",
    quote: "KZ is dead boys, get wrecked!"
  },
  {
    name: "8b0",
    quote: "Yo Zach, you don't have a 282 block? I'm kind of trig'd"
  },
  {
    name: "8b0",
    quote: "He just one shot it? What? Zpamm still here?"
  },
  {
    name: "Zpamm",
    quote: "Holy Shit!"
  },
  {
    name: "Zpamm",
    quote: "Zach, maybe you need-uh an update there on the holy shit!"
  },
  {
    name: "Kenneth",
    quote: "Hello, this is Kenneth, from KZ-Climb!"
  },
  {
    name: "sQQuared",
    quote: "danzay is the painter on minimum pay trying to fill in the hole with massive dick paint"
  },
  {
    name: "Klyve",
    quote: "the point file is the mexican pointing at the hole in your floor telling you that there is a hole there"
  },
  {
    name: "Zane",
    quote: "I am a level 2 binder now and I feel like a disgrace."
  },
  {
    name: "Zane",
    quote: "chokeburger on lan I'm HYPE"
  },
  {
    name: "Everyone",
    quote: "*Click*"
  },
  {
    name: "Froast",
    quote: "Oh shit what up!"
  },
  {
    name: "Zach47",
    quote: "LUq gonna pro run lets watch"
  },
  {
    name: "Supa",
    quote: "May diligence be your master-mind"
  },
  {
    name: "Plekz",
    quote: "just reading that gave me stage 7"
  },
  {
    name: "Plekz",
    quote: "cunts attract cunts"
  }
]
