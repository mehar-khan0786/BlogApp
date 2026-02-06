import { useAuth } from "../context/AuthProvider";
import Devetional from "../Home/Devetional";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Creator from "../Home/Creator";


export default function Home() {
  const { blogs,profile } = useAuth();
  console.log(profile)
  
  return (
    <>
    <Hero/>
    <Trending/>
    <Creator/>
    </>
  )
}