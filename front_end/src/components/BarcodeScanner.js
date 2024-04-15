import React, { useState, useEffect } from "react";
import Quagga from "quagga"; // 바코드 인식 라이브러리

const BarcodeScanner = () => {
  const [isbn, setIsbn] = useState(""); // 스캔된 바코드의 ISBN 숫자

  useEffect(() => {
    // 웹캠 접근 권한 요청 및 바코드 스캔 설정
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#barcode-scanner"), // 바코드 스캐너 화면이 표시될 요소 선택
        },
        decoder: {
          readers: ["ean_reader"], // 바코드 종류 설정
        },
      },
      (err) => {
        if (err) {
          console.error("Quagga initialization failed:", err);
          return;
        }
        Quagga.start(); // 바코드 스캐너 시작
      }
    );

    // 바코드 인식 이벤트 핸들러
    Quagga.onDetected((data) => {
      setIsbn(data.codeResult.code); // 스캔된 바코드의 ISBN 숫자 저장
      Quagga.stop(); // 바코드가 인식되면 스캐너 중지
    });

    // 컴포넌트 언마운트 시에 웹캠 사용 해제
    return () => {
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <div id="barcode-scanner" />
      {isbn && (
        <p>스캔된 ISBN 숫자: {isbn}</p>
      )}
    </div>
  );
};

export default BarcodeScanner;
