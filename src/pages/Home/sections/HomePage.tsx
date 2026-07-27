import HomeLayout from "./HomeLayout";
import FloatingActions from "./FloatingActions";

export default function HomePage() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 254, 250) 0%, rgb(255, 254, 250) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="1536w default">
      <HomeLayout />
      <FloatingActions />
    </div>
  );
}
