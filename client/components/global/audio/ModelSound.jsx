import React from "react";

const ModelSound = ({ beepRef, billScannerRef, billScannerFullRef }) => {
  return (
    <div hidden>
      <audio ref={billScannerRef} src="/sounds/print_bill.mp3" muted></audio>
      <audio ref={beepRef} src="/sounds/scanner__beep.mp3" muted></audio>
      <audio
        ref={billScannerFullRef}
        src="/sounds/print_bill_full.mp3"
        muted
      ></audio>
    </div>
  );
};

export default ModelSound;
