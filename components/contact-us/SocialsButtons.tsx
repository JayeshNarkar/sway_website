import { Instagram } from "lucide-react";
import Link from "next/link";

function SocialsButtons() {
  return (
    <div className="flex content-center justify-center">
      <Link href={"https://www.instagram.com/sway.cult"}>
        <Instagram className="h-8 w-8" />
      </Link>
    </div>
  );
}

export default SocialsButtons;
