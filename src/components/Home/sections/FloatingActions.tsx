import svgPaths from "../svg-g45k1n1pz5";
import { imgGroup1, imgGroup2 } from "../svg-ddib6";

function Group4() {
  return (
    <div className="absolute inset-[0.1%_0.33%_2.61%_0.12%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.039px_-0.031px] mask-size-[33.391px_31.165px]" style={{ maskImage: `url("${imgGroup1}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="31.133" preserveAspectRatio="none" viewBox="0 0 33.2434 31.133" width="33.2434">
        <g id="Group">
          <path d={svgPaths.p3c74fa00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p2a9cb300} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p1848e000} fill="var(--fill-0, white)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup3() {
  return (
    <div className="absolute contents inset-[0_0_2.61%_0]" data-name="Clip path group">
      <Group4 />
    </div>
  );
}

function IconZaloSvg1() {
  return (
    <div className="h-[32px] overflow-clip relative shrink-0 w-[33.391px]" data-name="icon-zalo.svg">
      <ClipPathGroup3 />
    </div>
  );
}

function IconZaloSvg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="icon-zalo.svg">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <IconZaloSvg1 />
      </div>
    </div>
  );
}

function Link15() {
  return (
    <div className="bg-[#b80000] content-stretch flex flex-col items-start p-[12.8px] relative rounded-[28.8px] shrink-0" data-name="Link">
      <div aria-hidden className="absolute border border-[rgba(244,230,182,0.5)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
      <IconZaloSvg />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[0_0.51%_0_0.5%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.16px_0px] mask-size-[32px_32px]" style={{ maskImage: `url("${imgGroup2}")` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 31.677 32" width="31.677">
        <g id="Group">
          <path d={svgPaths.p3cd94100} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup4() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group5 />
    </div>
  );
}

function IconMessengerSvg1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[32px]" data-name="icon-messenger.svg">
      <ClipPathGroup4 />
    </div>
  );
}

function IconMessengerSvg() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="icon-messenger.svg">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <IconMessengerSvg1 />
      </div>
    </div>
  );
}

function Link16() {
  return (
    <div className="bg-[#b80000] content-stretch flex flex-col items-start p-[12.8px] relative rounded-[28.8px] shrink-0" data-name="Link">
      <div aria-hidden className="absolute border border-[rgba(244,230,182,0.5)] border-solid inset-0 pointer-events-none rounded-[28.8px]" />
      <IconMessengerSvg />
    </div>
  );
}

export default function FloatingActions() {
  return (
    <>
      <style>{`
        @keyframes float-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .fab-btn {
          animation: float-wave 3s ease-in-out infinite;
        }
        .fab-btn:nth-child(2) {
          animation-delay: 0.5s;
        }
        .fab-ring {
          position: absolute;
          inset: 0;
          border-radius: 28.8px;
          border: 2px solid #b80000;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .fab-btn:nth-child(2) .fab-ring {
          animation-delay: 0.5s;
        }
      `}</style>
      <div className="fixed bottom-[32px] content-stretch flex flex-col gap-[20px] items-start right-[24px] z-[9999]" data-name="CLOSE FOOTER">
        <div className="fab-btn relative">
          <div className="fab-ring" />
          <Link15 />
        </div>
        <div className="fab-btn relative">
          <div className="fab-ring" />
          <Link16 />
        </div>
      </div>
    </>
  );
}
