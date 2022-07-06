import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HobbiesIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import { Box } from '@mui/material';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import Context from '../../contexts/Context';

const InputWrapper = styled('div')(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);
const Tag = (props) => {
  const { user, userId } = React.useContext(Context);
  const deleteHobby = (label) => {
    user.hobbies = user.hobbies.filter((hobby) => hobby.title === label ? false : true);
    fetch(`/api/user/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user.hobbies)
    });
    console.log(user);
  }
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon sx={{ width: 20, height: 20 }} onClick={() => { deleteHobby(label); onDelete(); }} />
    </div >
  );
};
Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
    };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);
const Listbox = styled('ul')(
  ({ theme }) => `
  width: 300px;
  margin: 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function Hobbies() {
  const { user, userId } = React.useContext(Context);
  const updateHobbies = () => {
    user.hobbies = value;
    fetch(`/api/user/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user.hobbies)
    });
    console.log(user);
  }
  const {
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    defaultValue: user.hobbies,
    multiple: true,
    options: hobbiesList,
    getOptionLabel: (option) => option.title,
  });
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ left: 0, display: 'flex', flexDirection: 'column', mt: -1, mb: 1, mx: 2 }}>
          <label>My Hobbies</label>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ position: 'absolute', left: 0, display: 'flex', flexDirection: 'column', mt: -1, mx: 2 }}>
          <HobbiesIcon sx={{ color: 'gray', width: 30, height: 30, mt: -3.5 }} />
        </Box>
        <Box sx={{ minHeight: 140, p: 3, display: 'flex' }}>
          <InputWrapper sx={{ width: 330, height: 40, maxHeight: 80, ml: 6, mt: -4, backgroundColor: 'transparent', border: 'none' }} ref={setAnchorEl}>
            {value.map((option, index) => (
              <StyledTag key={option.title} label={option.title} sx={{ fontSize: 11, p: 0, pl: 0.4 }} {...getTagProps({ index })} />
            ))}
            <input {...getInputProps()}
              onBlur={() => updateHobbies()}
              disabled={value.length >= 6}
              style={{ backgroundColor: 'transparent' }}
              placeholder={value.length === 0 ? 'Choose up to 6 hobbies...' : ''}
            />
          </InputWrapper>
          {groupedOptions.length > 0 ? (
            <Listbox sx={{ ml: 6, width: 270 }} {...getListboxProps()}>
              {groupedOptions.map((option, index) => (
                <li key={option.title} {...getOptionProps({ option, index })}>
                  <span>{option.title}</span>
                  <CheckIcon fontSize="small" />
                </li>
              ))}
            </Listbox>
          ) : null}
        </Box>
      </Box>
    </>
  )
}

const hobbiesList = [
  { title: '3D printing' },
  { title: 'Acroyoga' },
  { title: 'Acting' },
  { title: 'Animation' },
  { title: 'Anime' },
  { title: 'Aquascaping' },
  { title: 'Art' },
  { title: 'Astrology' },
  { title: 'Astronomy' },
  { title: 'Babysitting' },
  { title: 'Baking' },
  { title: 'Barbershop Music' },
  { title: 'Bartending' },
  { title: 'Baton twirling' },
  { title: 'Beatboxing' },
  { title: 'Beer tasting' },
  { title: 'Bell ringing' },
  { title: 'Binge watching' },
  { title: 'Blacksmith' },
  { title: 'Blogging' },
  { title: 'Bonsai' },
  { title: 'Board/tabletop games' },
  { title: 'Book discussion clubs' },
  { title: 'Book restoration' },
  { title: 'Bowling' },
  { title: 'Brazilian jiu-jitsu' },
  { title: 'Breadmaking' },
  { title: 'Building' },
  { title: 'Bullet journaling' },
  { title: 'Butchering' },
  { title: 'Calligraphy' },
  { title: 'Candle making' },
  { title: 'Candy making' },
  { title: 'Car spotting' },
  { title: 'Car fixing & building' },
  { title: 'Card games' },
  { title: 'Cardistry' },
  { title: 'Ceramics' },
  { title: 'Chatting' },
  { title: 'Cheesemaking' },
  { title: 'Chess' },
  { title: 'Cleaning' },
  { title: 'Clothesmaking' },
  { title: 'Coffee roasting' },
  { title: 'Collecting' },
  { title: 'Coloring' },
  { title: 'Communication' },
  { title: 'Community activism' },
  { title: 'Computer programming' },
  { title: 'Confectionery' },
  { title: 'Conlanging' },
  { title: 'Construction' },
  { title: 'Cooking' },
  { title: 'Cosplaying' },
  { title: 'Couponing' },
  { title: 'Craft' },
  { title: 'Creative writing' },
  { title: 'Crocheting' },
  { title: 'Cross-stitch' },
  { title: 'Crossword puzzles' },
  { title: 'Cryptography' },
  { title: 'Cue sports' },
  { title: 'Dance' },
  { title: 'Decorating' },
  { title: 'Decorative birds' },
  { title: 'Digital arts' },
  { title: 'Dining' },
  { title: 'Diorama' },
  { title: 'Distro Hopping' },
  { title: 'Diving' },
  { title: 'Djembe' },
  { title: 'DJing' },
  { title: 'Do it yourself' },
  { title: 'Drama' },
  { title: 'Drawing' },
  { title: 'Editing' },
  { title: 'Electronic games' },
  { title: 'Electronics' },
  { title: 'Embroidery' },
  { title: 'Engraving' },
  { title: 'Entertaining' },
  { title: 'Everyday carry' },
  { title: 'Experimenting' },
  { title: 'Fantasy sports' },
  { title: 'Fashion' },
  { title: 'Fashion design' },
  { title: 'Feng shui decorating' },
  { title: 'Filmmaking' },
  { title: 'Fingerpainting' },
  { title: 'Fishfarming' },
  { title: 'Fishkeeping' },
  { title: 'Flower arranging' },
  { title: 'Fly tying' },
  { title: 'Foreign language learning' },
  { title: 'Furniture building' },
  { title: 'Gaming' },
  { title: 'Tabletop games' },
  { title: 'Role-playing games' },
  { title: 'Genealogy' },
  { title: 'Gingerbread house making' },
  { title: 'Giving advice' },
  { title: 'Glassblowing' },
  { title: 'Gardening' },
  { title: 'Gongfu tea' },
  { title: 'Graphic design' },
  { title: 'Gunsmithing' },
  { title: 'Hacking' },
  { title: 'Hairstyle' },
  { title: 'Hardware' },
  { title: 'Herp keeping' },
  { title: 'Home improvement' },
  { title: 'Homebrewing' },
  { title: 'Homing pigeons' },
  { title: 'Houseplant care' },
  { title: 'Hula hooping' },
  { title: 'Hydroponics' },
  { title: 'Ice skating' },
  { title: 'Inventing' },
  { title: 'Jewelry making' },
  { title: 'Jigsaw puzzles' },
  { title: 'Journaling' },
  { title: 'Judo' },
  { title: 'Juggling' },
  { title: 'Karaoke' },
  { title: 'Karate' },
  { title: 'Kendama' },
  { title: 'Knife making' },
  { title: 'Knitting' },
  { title: 'Knot tying' },
  { title: 'Kombucha brewing' },
  { title: 'Kung fu' },
  { title: 'Lace making' },
  { title: 'Lapidary' },
  { title: 'Leather crafting' },
  { title: 'Lego building' },
  { title: 'Livestreaming' },
  { title: 'Listening to music' },
  { title: 'Listening to podcasts' },
  { title: 'Lock picking' },
  { title: 'Machining' },
  { title: 'Macrame' },
  { title: 'Magic' },
  { title: 'Makeup' },
  { title: 'Manga' },
  { title: 'Massaging' },
  { title: 'Mazes (indoor/outdoor)' },
  { title: 'Mechanics' },
  { title: 'Meditation' },
  { title: 'Memory training' },
  { title: 'Metalworking' },
  { title: 'Miniature art' },
  { title: 'Minimalism' },
  { title: 'Model building' },
  { title: 'Modeling' },
  { title: 'Model engineering' },
  { title: 'Music' },
  { title: 'Nail art' },
  { title: 'Needlepoint' },
  { title: 'Origami' },
  { title: 'Painting' },
  { title: 'Pen Spinning' },
  { title: 'Performance' },
  { title: 'Pet sitting' },
  { title: 'Philately' },
  { title: 'Photography' },
  { title: 'Pilates' },
  { title: 'Pipes' },
  { title: 'Planning' },
  { title: 'Plastic art' },
  { title: 'Playing musical instruments' },
  { title: 'Poetry' },
  { title: 'Poi' },
  { title: 'Pole dancing' },
  { title: 'Postcrossing' },
  { title: 'Pottery' },
  { title: 'Practical jokes' },
  { title: 'Pressed flower craft' },
  { title: 'Proofreading and editing' },
  { title: 'Proverbs' },
  { title: 'Public speaking' },
  { title: 'Puppetry' },
  { title: 'Puzzles' },
  { title: 'Pyrography' },
  { title: 'Quilling' },
  { title: 'Quilting' },
  { title: 'Quizzes' },
  { title: 'Radio-controlled model playing' },
  { title: 'Rail transport modeling' },
  { title: 'Rapping' },
  { title: 'Reading' },
  { title: 'Recipe creation' },
  { title: 'Refinishing' },
  { title: 'Reiki' },
  { title: 'Reviewing Gadgets' },
  { title: 'Robot combat' },
  { title: 'Rubik\'s Cube' },
  { title: 'Scrapbooking' },
  { title: 'Scuba Diving' },
  { title: 'Sculpting' },
  { title: 'Sewing' },
  { title: 'Shoemaking' },
  { title: 'Singing' },
  { title: 'Sketching' },
  { title: 'Skipping rope' },
  { title: 'Slot car' },
  { title: 'Soapmaking' },
  { title: 'Social media' },
  { title: 'Spreadsheets' },
  { title: 'Stamp collecting' },
  { title: 'Stand-up comedy' },
  { title: 'Storytelling' },
  { title: 'Stretching' },
  { title: 'Stripping' },
  { title: 'Sudoku' },
  { title: 'Talking' },
  { title: 'Taekwondo' },
  { title: 'Tapestry' },
  { title: 'Tarot' },
  { title: 'Tattooing' },
  { title: 'Taxidermy' },
  { title: 'Telling jokes' },
  { title: 'Thrifting' },
  { title: 'Upcycling' },
  { title: 'Video editing' },
  { title: 'Video game developing' },
  { title: 'Video gaming' },
  { title: 'Video making' },
  { title: 'VR Gaming' },
  { title: 'Wargaming' },
  { title: 'Watch making' },
  { title: 'Watching documentaries' },
  { title: 'Watching movies' },
  { title: 'Watching television' },
  { title: 'Wax sealing' },
  { title: 'Waxing' },
  { title: 'Weaving' },
  { title: 'Webtooning' },
  { title: 'Weight training' },
  { title: 'Welding' },
  { title: 'Whittling' },
  { title: 'Wikipedia editing' },
  { title: 'Wine tasting' },
  { title: 'Winemaking' },
  { title: 'Witchcraft' },
  { title: 'Wood carving' },
  { title: 'Woodworking' },
  { title: 'Word searches' },
  { title: 'Worldbuilding' },
  { title: 'Wikipedia racing/Wikiracing' },
  { title: 'Writing' },
  { title: 'Writing music' },
  { title: 'Yo-yoing' },
  { title: 'Yoga' },
  { title: 'Zumba' },
  { title: 'Air sports' },
  { title: 'Airsoft' },
  { title: 'Amateur geology' },
  { title: 'Amusement park visiting' },
  { title: 'Archery' },
  { title: 'Auto detailing' },
  { title: 'Automobilism' },
  { title: 'Backpacking' },
  { title: 'Badminton' },
  { title: 'BASE jumping' },
  { title: 'Baseball' },
  { title: 'Basketball' },
  { title: 'Beachcombing' },
  { title: 'Beekeeping' },
  { title: 'Birdwatching' },
  { title: 'Blacksmithing' },
  { title: 'BMX' },
  { title: 'Board sports' },
  { title: 'Bodybuilding' },
  { title: 'Bus riding' },
  { title: 'Camping' },
  { title: 'Canoeing' },
  { title: 'Canyoning' },
  { title: 'Carrier pigeons' },
  { title: 'Car riding' },
  { title: 'Car tuning' },
  { title: 'Caving' },
  { title: 'City trip' },
  { title: 'Climbing' },
  { title: 'Composting' },
  { title: 'Croquet' },
  { title: 'Cycling' },
  { title: 'Dairy Farming' },
  { title: 'Dandyism' },
  { title: 'Darts' },
  { title: 'Dodgeball' },
  { title: 'Dog training' },
  { title: 'Dog walking' },
  { title: 'Dowsing' },
  { title: 'Driving' },
  { title: 'Farming' },
  { title: 'Farming (Animal)' },
  { title: 'Fishing' },
  { title: 'Flag football' },
  { title: 'Flower growing' },
  { title: 'Flying' },
  { title: 'Flying disc' },
  { title: 'Flying model planes' },
  { title: 'Foraging' },
  { title: 'Fossicking' },
  { title: 'Freestyle football' },
  { title: 'Fruit picking' },
  { title: 'Geocaching' },
  { title: 'Ghost hunting' },
  { title: 'Gold prospecting' },
  { title: 'Graffiti' },
  { title: 'Groundhopping' },
  { title: 'Guerrilla gardening' },
  { title: 'Gymnastics' },
  { title: 'Handball' },
  { title: 'Herbalism' },
  { title: 'Herping' },
  { title: 'High-power rocketry' },
  { title: 'Hiking' },
  { title: 'Hobby horsing' },
  { title: 'Hobby tunneling' },
  { title: 'Hooping' },
  { title: 'Horseback riding' },
  { title: 'Hunting' },
  { title: 'Inline skating' },
  { title: 'Jogging' },
  { title: 'Jumping rope' },
  { title: 'Karting' },
  { title: 'Kayaking' },
  { title: 'Kite flying' },
  { title: 'Kitesurfing' },
  { title: 'Lacrosse' },
  { title: 'LARPing' },
  { title: 'Letterboxing' },
  { title: 'Lomography' },
  { title: 'Longboarding' },
  { title: 'Martial arts' },
  { title: 'Metal detecting' },
  { title: 'Motorcycling' },
  { title: 'Meteorology' },
  { title: 'Motor sports' },
  { title: 'Mountain biking' },
  { title: 'Mountaineering' },
  { title: 'Museum visiting' },
  { title: 'Mushroom hunting/mycology' },
  { title: 'Netball' },
  { title: 'Noodling' },
  { title: 'Nordic skating' },
  { title: 'Orienteering' },
  { title: 'Paintball' },
  { title: 'Paragliding' },
  { title: 'Parkour' },
  { title: 'Pickleball' },
  { title: 'Picnicking' },
  { title: 'Podcast hosting' },
  { title: 'Polo' },
  { title: 'Powerlifting' },
  { title: 'Public transport riding' },
  { title: 'Qigong' },
  { title: 'Rafting' },
  { title: 'Railway journeys' },
  { title: 'Railway modelling' },
  { title: 'Rappelling' },
  { title: 'Renaissance fair' },
  { title: 'Renovating' },
  { title: 'Road biking' },
  { title: 'Rock climbing' },
  { title: 'Rock painting' },
  { title: 'Roller skating' },
  { title: 'Roundnet' },
  { title: 'Rugby' },
  { title: 'Running' },
  { title: 'Safari' },
  { title: 'Sailing' },
  { title: 'Sand art' },
  { title: 'Scouting' },
  { title: 'Sculling or rowing' },
  { title: 'Shooting' },
  { title: 'Shopping' },
  { title: 'Shuffleboard' },
  { title: 'Skateboarding' },
  { title: 'Skiing' },
  { title: 'Skimboarding' },
  { title: 'Skydiving' },
  { title: 'Slacklining' },
  { title: 'Sledding' },
  { title: 'Snorkeling' },
  { title: 'Snowboarding' },
  { title: 'Snowmobiling' },
  { title: 'Snowshoeing' },
  { title: 'Soccer' },
  { title: 'Stone skipping' },
  { title: 'Storm chasing' },
  { title: 'Sun bathing' },
  { title: 'Surfing' },
  { title: 'Survivalism' },
  { title: 'Swimming' },
  { title: 'Table tennis playing' },
  { title: 'Tai chi' },
  { title: 'Tennis' },
  { title: 'Thru-hiking' },
  { title: 'Topiary' },
  { title: 'Tourism' },
  { title: 'Trade fair visiting' },
  { title: 'Travel' },
  { title: 'Unicycling' },
  { title: 'Urban exploration' },
  { title: 'Vacation' },
  { title: 'Vegetable farming' },
  { title: 'Vehicle restoration' },
  { title: 'Videography' },
  { title: 'Volleyball' },
  { title: 'Volunteering' },
  { title: 'Walking' },
  { title: 'Water sports' },
  { title: 'Zoo visiting' },
  { title: 'Archaeology' },
  { title: 'Aerospace' },
  { title: 'Biology' },
  { title: 'Botany' },
  { title: 'Business' },
  { title: 'Chemistry' },
  { title: 'English' },
  { title: 'Entrepreneurship' },
  { title: 'Geography' },
  { title: 'History' },
  { title: 'Linguistics' },
  { title: 'Literature' },
  { title: 'Mathematics' },
  { title: 'Medical science' },
  { title: 'Microbiology' },
  { title: 'Mycology' },
  { title: 'Neuroscience' },
  { title: 'Philosophy' },
  { title: 'Physics' },
  { title: 'Psychology' },
  { title: 'Railway studies' },
  { title: 'Research' },
  { title: 'Science and technology studies' },
  { title: 'Social studies' },
  { title: 'Sociology' },
  { title: 'Sports science' },
  { title: 'Story writing' },
  { title: 'Life science' },
  { title: 'Teaching' },
  { title: 'Web design' },
  { title: 'Action figure' },
  { title: 'Antiquing' },
  { title: 'Ant-keeping' },
  { title: 'Art collecting' },
  { title: 'Book collecting' },
  { title: 'Button collecting' },
  { title: 'Cartophily (card collecting)' },
  { title: 'Coin collecting' },
  { title: 'Comic book collecting' },
  { title: 'Compact discs' },
  { title: 'Crystals' },
  { title: 'Deltiology (postcard collecting)' },
  { title: 'Die-cast toy' },
  { title: 'Digital hoarding' },
  { title: 'Dolls' },
  { title: 'Element collecting' },
  { title: 'Ephemera collecting' },
  { title: 'Films' },
  { title: 'Fingerprint collecting' },
  { title: 'Fusilately (phonecard collecting)' },
  { title: 'Knife collecting' },
  { title: 'Lapel pin' },
  { title: 'Lotology (lottery ticket collecting)' },
  { title: 'Movie memorabilia collecting' },
  { title: 'Perfume' },
  { title: 'Phillumeny' },
  { title: 'Radio-controlled model collecting' },
  { title: 'Rail transport modelling' },
  { title: 'Record collecting' },
  { title: 'Rock tumbling' },
  { title: 'Scutelliphily' },
  { title: 'Shoes' },
  { title: 'Sports memorabilia' },
  { title: 'Stuffed toy collecting' },
  { title: 'Tea bag collecting' },
  { title: 'Ticket collecting' },
  { title: 'Transit map collecting' },
  { title: 'Video game collecting' },
  { title: 'Vintage cars' },
  { title: 'Vintage clothing' },
  { title: 'Vinyl Records' },
  { title: 'Antiquities' },
  { title: 'Auto audiophilia' },
  { title: 'Flower collecting and pressing' },
  { title: 'Fossil hunting' },
  { title: 'Insect collecting' },
  { title: 'Leaves' },
  { title: 'Magnet fishing' },
  { title: 'Mineral collecting' },
  { title: 'Rock balancing' },
  { title: 'Sea glass collecting' },
  { title: 'Seashell collecting' },
  { title: 'Stone collecting' },
  { title: 'Air hockey' },
  { title: 'Animal fancy' },
  { title: 'Axe throwing' },
  { title: 'Backgammon' },
  { title: 'Ballet dancing' },
  { title: 'Ballroom dancing' },
  { title: 'Beauty pageants' },
  { title: 'Billiards' },
  { title: 'Book folding' },
  { title: 'Boxing' },
  { title: 'Bridge' },
  { title: 'Checkers (draughts)' },
  { title: 'Cheerleading' },
  { title: 'Color guard' },
  { title: 'Cribbage' },
  { title: 'Curling' },
  { title: 'Dancing' },
  { title: 'Debate' },
  { title: 'Dominoes' },
  { title: 'Eating' },
  { title: 'Esports' },
  { title: 'Fencing' },
  { title: 'Figure Skating' },
  { title: 'Go' },
  { title: 'Ice hockey' },
  { title: 'Jujitsu' },
  { title: 'Kabaddi' },
  { title: 'Knowledge/word games' },
  { title: 'Laser tag' },
  { title: 'Mahjong' },
  { title: 'Marbles' },
  { title: 'Model racing' },
  { title: 'Model United Nations' },
  { title: 'Poker' },
  { title: 'Pool' },
  { title: 'Rughooking' },
  { title: 'Shogi' },
  { title: 'Slot car racing' },
  { title: 'Speedcubing' },
  { title: 'Sport stacking' },
  { title: 'Table football' },
  { title: 'Table tennis' },
  { title: 'Weightlifting' },
  { title: 'Wrestling' },
  { title: 'Association football' },
  { title: 'Australian rules football' },
  { title: 'Auto racing' },
  { title: 'Beach volleyball' },
  { title: 'Breakdancing' },
  { title: 'Cornhole' },
  { title: 'Cricket' },
  { title: 'Disc golf' },
  { title: 'Dog sport' },
  { title: 'Equestrianism' },
  { title: 'Exhibition drill' },
  { title: 'Field hockey' },
  { title: 'Fitness' },
  { title: 'Footbag' },
  { title: 'Frisbee' },
  { title: 'Golfing' },
  { title: 'Horsemanship' },
  { title: 'Horseshoes' },
  { title: 'Iceboat racing' },
  { title: 'Jukskei' },
  { title: 'Kart racing' },
  { title: 'Knife throwing' },
  { title: 'Long-distance running' },
  { title: 'Marching band' },
  { title: 'Mini Golf' },
  { title: 'Model aircraft' },
  { title: 'Powerboat racing' },
  { title: 'Quidditch' },
  { title: 'Race walking' },
  { title: 'Racquetball' },
  { title: 'Radio-controlled car racing' },
  { title: 'Roller derby' },
  { title: 'Rugby league football' },
  { title: 'Shooting sports' },
  { title: 'Sled dog racing' },
  { title: 'Softball' },
  { title: 'Speed skating' },
  { title: 'Squash' },
  { title: 'Tennis polo' },
  { title: 'Tether car' },
  { title: 'Tour skating' },
  { title: 'Trapshooting' },
  { title: 'Triathlon' },
  { title: 'Ultimate frisbee' },
  { title: 'Water polo' },
  { title: 'Audiophile' },
  { title: 'Learning' },
  { title: 'Microscopy' },
  { title: 'Shortwave listening' },
  { title: 'Aircraft spotting' },
  { title: 'Amateur astronomy' },
  { title: 'Benchmarking' },
  { title: 'Bus spotting' },
  { title: 'Butterfly watching' },
  { title: 'Gongoozling' },
  { title: 'Hiking/backpacking' },
  { title: 'People-watching' },
  { title: 'Satellite watching' },
  { title: 'Trainspotting' },
  { title: 'Whale watching' }
]

