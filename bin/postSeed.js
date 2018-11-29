const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/gofinds', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const usersWithIds = {};

const posts = [
  {
    title: 'Great Wall of China',
    description: `The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe with an eye to expansion. Several walls were being built as early as the 7th century BC; these, later joined together and made bigger and stronger, are collectively referred to as the Great Wall. Especially famous is the wall built in 220–206 BC by Qin Shi Huang, the first Emperor of China. Little of that wall remains. The Great Wall has been rebuilt, maintained, and enhanced over various dynasties; the majority of the existing wall is from the Ming Dynasty (1368–1644). Apart from defense, other purposes of the Great Wall have included border controls, allowing the imposition of duties on goods transported along the Silk Road, regulation or encouragement of trade and the control of immigration and emigration. Furthermore, the defensive characteristics of the Great Wall were enhanced by the construction of watch towers, troop barracks, garrison stations, signaling capabilities through the means of smoke or fire, and the fact that the path of the Great Wall also served as a transportation corridor. The frontier walls built by different dynasties have multiple courses. Collectively, they stretch from Dandong in the east to Lop Lake in the west, from present-day Sino-Russian border in the north to Qinghai in the south; along an arc that roughly delineates the edge of Mongolian steppe. A comprehensive archaeological survey, using advanced technologies, has concluded that the walls built by the Ming dynasty measure 8,850 km (5,500 mi). This is made up of 6,259 km (3,889 mi) sections of actual wall, 359 km (223 mi) of trenches and 2,232 km (1,387 mi) of natural defensive barriers such as hills and rivers. Another archaeological survey found that the entire wall with all of its branches measures out to be 21,196 km (13,171 mi). Today, the Great Wall is generally recognized as one of the most impressive architectural feats in history.`,
    comment: `I don't like it, it's way too easy to climb`,
    imageUrl: 'http://res.cloudinary.com/gofinds/image/upload/v1543503926/demo/aeai0zffa1e2nowe8bzk.jpg'
  },
  {
    title: 'Western Wall',
    description: `The Western Wall, Wailing Wall, or Kotel, known in Islam as the Buraq Wall, is an ancient limestone wall in the Old City of Jerusalem. It is a relatively small segment of a far longer ancient retaining wall, known also in its entirety as the "Western Wall". The wall was originally erected as part of the expansion of the Second Jewish Temple begun by Herod the Great, which resulted in the encasement of the natural, steep hill known to Jews and Christians as the Temple Mount, in a large rectangular structure topped by a huge flat platform, thus creating more space for the Temple itself and its auxiliary buildings. For Muslims, it is the site where the Islamic Prophet Muhammad tied his steed, al-Buraq, on his night journey to Jerusalem before ascending to paradise, and constitutes the Western border of al-Haram al-Sharif. The Western Wall is considered holy due to its connection to the Temple Mount. Because of the Temple Mount entry restrictions, the Wall is the holiest place where Jews are permitted to pray, though the holiest site in the Jewish faith lies behind it. The original, natural, and irregular-shaped Temple Mount was gradually extended to allow for an ever-larger Temple compound to be built at its top. This process was finalised by Herod, who enclosed the Mount with an almost rectangular set of retaining walls, built to support extensive substructures and earth fills needed to give the natural hill a geometrically regular shape. On top of this box-like structure Herod built a vast paved esplanade which surrounded the Temple. Of the four retaining walls, the western one is considered to be closest to the former Temple, which makes it the most sacred site recognised by Judaism outside the former Temple Mount esplanade. Just over half the wall's total height, including its 17 courses located below street level, dates from the end of the Second Temple period, and is commonly believed to have been built around 19 BCE by Herod the Great, although recent excavations indicate that the work was not finished by the time Herod died in 4 BCE. The very large stone blocks of the lower courses are Herodian, the courses of medium-sized stones above them were added during the Umayyad era, while the small stones of the uppermost courses are of more recent date, especially from the Ottoman period. The term Western Wall and its variations are mostly used in a narrow sense for the section traditionally used by Jews for prayer; it has also been called the "Wailing Wall", referring to the practice of Jews weeping at the site over the destruction of the Temples. During the period of Christian Roman rule over Jerusalem (ca. 324–638), Jews were completely barred from Jerusalem except to attend Tisha be-Av, the day of national mourning for the Temples, and on this day the Jews would weep at their holy places. The term "Wailing Wall" was thus almost exclusively used by Christians, and was revived in the period of non-Jewish control between the establishment of British Rule in 1920 and the Six-Day War in 1967. The term "Wailing Wall" is not used by Jews, and increasingly not by many others who consider it derogatory.In a broader sense, "Western Wall" can refer to the entire 488-metre-long (1,601 ft) retaining wall on the western side of the Temple Mount. The classic portion now faces a large plaza in the Jewish Quarter, near the southwestern corner of the Temple Mount, while the rest of the wall is concealed behind structures in the Muslim Quarter, with the small exception of a 25 ft (8 m) section, the so-called Little Western Wall. The segment of the Western retaining wall traditionally used for Jewish liturgy, known as the "Western Wall", derives its particular importance to it having never been fully obscured by medieval buildings, and displaying much more of the original Herodian stonework than the "Little Western Wall". In religious terms, the "Little Western Wall" is presumed to be even closer to the Holy of Holies and thus to the "presence of God" (Shechina), and the underground Warren's Gate, which has been out of reach since the 12th century, even more so. Whilst the wall was considered Muslim property as an integral part of the Haram esh-Sharif and waqf property of the Moroccan Quarter, a right of Jewish prayer and pilgrimage existed as part of the Status Quo.The earliest source mentioning this specific site as a place of worship is from the 16th century. The previous sites used by Jews for mourning the destruction of the Temple, during periods when access to the city was prohibited to them, lay to the east, on the Mount of Olives and in the Kidron Valley below it. From the mid-19th century onwards, attempts to purchase rights to the wall and its immediate area were made by various Jews, but none was successful. With the rise of the Zionist movement in the early 20th century, the wall became a source of friction between the Jewish and Muslim communities, the latter being worried that the wall could be used to further Jewish claims to the Temple Mount and thus Jerusalem. During this period outbreaks of violence at the foot of the wall became commonplace, with a particularly deadly riot in 1929 in which 133 Jews were killed and 339 injured. After the 1948 Arab–Israeli War the Eastern portion of Jerusalem was occupied by Jordan. Under Jordanian control Jews were completely expelled from the Old City including the Jewish quarter, and Jews were barred from entering the Old City for 19 years, effectively banning Jewish prayer at the site of the Western Wall. This period ended on June 10, 1967, when Israel gained control of the site following the Six-Day War. Three days after establishing control over the Western Wall site the Moroccan Quarter was bulldozed by Israeli authorities to create space for what is now the Western Wall plaza.`,
    comment: `It's way too small`,
    imageUrl: 'http://res.cloudinary.com/gofinds/image/upload/v1543504016/demo/rfb7c0ww8jajkhciql2p.jpg'
  },
  {
    title: 'Eiffel Tower',
    description: `The Eiffel Tower ( EYE-fəl; French: Tour Eiffel [tuʁ‿ɛfɛl] (listen)) is a wrought iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower. Constructed from 1887–1889 as the entrance to the 1889 World's Fair, it was initially criticized by some of France's leading artists and intellectuals for its design, but it has become a global cultural icon of France and one of the most recognisable structures in the world. The Eiffel Tower is the most-visited paid monument in the world; 6.91 million people ascended it in 2015. The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct. The tower has three levels for visitors, with restaurants on the first and second levels. The top level's upper platform is 276 m (906 ft) above the ground – the highest observation deck accessible to the public in the European Union. Tickets can be purchased to ascend by stairs or lift to the first and second levels. The climb from ground level to the first level is over 300 steps, as is the climb from the first level to the second. Although there is a staircase to the top level, it is usually accessible only by lift.`,
    comment: 'I liked it',
    imageUrl: 'http://res.cloudinary.com/gofinds/image/upload/v1543504183/demo/deaflpvqsi2exarmj0bh.jpg'
  }
];

User.find()
  .then(users => {
    users.forEach(user => {
      if (user.username === 'camus' || user.username === 'donald trump') {
        usersWithIds[user.username] = user._id;
      }
    });
    console.log(usersWithIds);
    posts[0].owner = usersWithIds['donald trump'];
    posts[1].owner = usersWithIds['donald trump'];
    posts[2].owner = usersWithIds.camus;
    Post.create(posts)
      .then(() => {
        mongoose.connection.close();
      })
      .catch(error => {
        console.error(error);
      });
  })
  .catch();
