import React,{useState, useEffect} from 'react'
import styled from 'styled-components';
import TutorialCard from '../components/Cards/TutorialCard';



const Container = styled.div`
 flex:1;
 height:100%;
 width:100%;
 display:flex;
 flex-wrap:wrap;
flex-direction:row;
gap:10px;
 justify-content:start;
 padding: 22px 8px;
 overflow-y:scroll;
&::-webkit-scrollbar {
    display: none;
  };
`;


// const Card = styled.div`
// width:250px;
// height:300px;
// padding: 24px;
// display:flex;
// flex-direction:column;
// gap:6px;
// border:1px solid ${({theme})=> theme.text_primary+20};
// border-radius:14px;
// box-shadow : 1px 6px 20px 0px ${({theme})=> theme.primary+15};
// @media (max-width:600px){
// padding:16px;
// }
// `;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:999;
`;

const Video = styled.video`
  width: 70%;
  height:70%;
  padding-top:20px;
  border-radius: 10px;
`;

const Iframe = styled.iframe`
  width: 70%;
  height: 60%;
   padding-top:20px;
  border-radius: 10px;
`;



const Tutorials = () => {
  const [videoUrl, setVideoUrl] = useState(null);

const tutorials = [
  {
    id: 1,
    title: "The Perfect Morning Routine to Build Muscle",
    description: " Well after making six science-backed changes to my morning routine for muscle growth (including eating the best breakfast for muscle growth), my gains drastically improved—along with my energy and productivity.",
    thumbnail: "https://i.ytimg.com/vi/eifEiCYH2yc/maxresdefault.jpg",
    video: "https://youtu.be/eifEiCYH2yc",
  },
   {
    id: 2,
    title: "The Perfect Morning Habits (Backed by Science)",
    description: "In this video, I break down the perfect morning habits that build discipline, clarity, and control without motivation. These aren’t feel-good routines or aesthetic habits. This is a system that trains your mind, body, and identity to win the day before it starts",
    thumbnail: "https://i.ytimg.com/vi/_7XyH9wastQ/hqdefault.jpg?v=69b509f7",
     video: "https://youtu.be/uVzCPllwmqw",
  },
   {
    id: 3,
    title: "Fast Morning Exercises for Full Body",
    description: "morning exercises for weight loss,morning exercise at home,morning exercise for beginners,morning exercise for men,morning exercise at home with pictures,morning exercises for men,morning exercise for girl,best morning exercise,Warmup Exercises,morning routine program",
    thumbnail: "data:image/jpeg;base64,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",
    video: "https://youtu.be/9o0UPuDBM8M",
  },
   {
    id: 4,
    title: "The Best Exercise For Health, Fitness, and Longevity",
    description: "In this video, He discusses the specific fitness benefits of zone 2 training such as strengthening the heart and other cardiovascular structures, as well as how it improves mitochondrial function and metabolic efficiency. ",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXtaoAIigQYPODarG0fn5Gy6ifEkhzNA2zQ&s",
    video: "https://youtu.be/8ef7FhmMcLU",
  },
  {
    id: 5,
    title: "Home Workout (Beginner Workout)",
    description: "20 min Fat Burning Workout for TOTAL BEGINNERS (Achievable, No Equipment)",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4tsMh83XRXga6n4x1wDM5559TW0MQd_qRCA&s",
    video: "https://youtu.be/IT94xC35u6k",
  },
   {
    id: 6,
    title: "Lose Belly Fat FAST with These 3 Simple Changes",
    description: "In this video, I explain belly fat loss in a very simple way. I talk about why many people try hard but still don’t see results. The first thing I clear is a big myth. You cannot lose fat from just one place.",
    thumbnail: "https://i.ytimg.com/vi/rXG6cyI3pzI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBy1eeEA94jQ4pPXTzhMi66_rqFWg",
    video: "https://youtu.be/4nc4M6Oo9ZE",
  },
   {
    id: 7,
    title: "The ONLY Workout You Need For 2026",
    description: "After 10+ years of testing every workout split, workout routine, and coaching thousands of people, I’ve found that a full body workout routine at the gym done 3x/week gives you the best results in the least amount of time — but the key is choosing the right exercises",
    thumbnail: "https://i.ytimg.com/vi/n_YW24F5HGc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAgofTMiwCCdsaJXORrqlwgxXOnxw",
    video: "https://youtu.be/n_YW24F5HGc",
  },
   {
    id: 8,
    title: "How to Do 90+ Push Ups in 1 Set (PROVEN Method)",
    description: "This video drops the elite-level secret nobody teaches: The Push-up Progressive Failure Ladder.",
    thumbnail: "https://i.ytimg.com/vi/clr5KumU_3w/sddefault.jpg",
    video: "https://youtu.be/5rEoCJ2arYs",
  },
   {
    id: 9,
    title: "The ONLY 2 Exercises You Need For Six Pack Abs",
    description: "There are over 500 different abs exercises out there, but only 2 that actually helped me build my six pack. Because to get well-defined abs, it’s not just about having low body fat. It also comes down to the ab workout and ab exercises you use to train them.",
    thumbnail: "https://i.ytimg.com/vi/Y0nXmTZ1Ibs/maxresdefault.jpg",
    video: "https://youtu.be/Y0nXmTZ1Ibs",
  },
   {
    id: 10,
    title: "Your shoulders need these Exercises (Do THIS!)",
    description: "Tired of basic push-ups leaving your arms flat? This video focuses on achieving that ultimate V-taper physique by targeting the often-ignored side delt exercises.",
    thumbnail: "https://i.ytimg.com/vi/ufrFCjERMDc/mqdefault.jpg",
    video: "https://youtu.be/ExtmXSOLhWs",
  },
];

// const [tutorials, setTutorials] =  useState([]);

// useEffect(() => {
//     const fetchTutorials = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/tutorials");
//         setTutorials(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//       fetchTutorials();
//   }, []);


  return (
    <Container>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {tutorials.map((item) => (
          <TutorialCard
            key={item.id}
            item={item}
            onClick={setVideoUrl}
          />
        ))}
      </div>

      {videoUrl && (
        <Modal onClick={() => setVideoUrl(null)}>
          {/* <Video src={videoUrl} controls autoPlay muted  onClick={(e) => e.stopPropagation()} /> */}
          
          {videoUrl.includes("youtube") || videoUrl.includes("youtu.be") ? (
          <Iframe
      src={videoUrl.replace("youtu.be/", "www.youtube.com/embed/")}
      frameBorder="0"
      allowFullScreen
      onClick={(e) => e.stopPropagation()}
    /> ): (
  <Video src={videoUrl} controls autoPlay   onClick={(e) => e.stopPropagation()} />
)}
        </Modal>
      )}
    </Container>
  );
};

export default Tutorials

