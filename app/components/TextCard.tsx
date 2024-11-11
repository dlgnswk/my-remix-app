import { Separator } from "~/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const TextCard = () => {
  return (
    <Card className="w-full max-w-2xl h-full p-4">
      <CardHeader className="p-0 mb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Preview</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="mt-2 p-0">
        <p className="text-muted-foreground text-sm">
          $
          {`<p style="line-height: 1.8;">
	<span style="color: rgb(51, 51, 51); font-family: 나눔고딕, NanumGothic; font-size: 12pt; letter-spacing: -0.4px; text-align: justify;">
		업체 측은 "완전 자율주행의 완성을 위해서는 출발지이자 목적지인 주차장, 주차면까지의 자율주행이 필수"라며 "하지만 일반적인 도로 규칙이 적용되지 않고 GPS(위성항법시스템) 정보도 사용하기 어려운 주차장의 특성이 걸림돌"이라고 말했다. 이어 "제로크루징은 'AI(인공지능) 기술'과 'V2I 통신'으로 난제를 해결한다"고 덧붙였다.
	</span>
	<br style="color: rgb(51, 51, 51); font-family: 맑은고딕, &quot;Malgun Gothic&quot;, 돋움, dotum, sans-serif; font-size: 16px; letter-spacing: -0.4px; text-align: justify;">
	<br style="color: rgb(51, 51, 51); font-family: 맑은고딕, &quot;Malgun Gothic&quot;, 돋움, dotum, sans-serif; font-size: 16px; letter-spacing: -0.4px; text-align: justify;">
	<span style="color: rgb(51, 51, 51); font-family: 나눔고딕, NanumGothic; font-size: 12pt; letter-spacing: -0.4px; text-align: justify;">
		제로크루징은 GPS 음영 지역인 실내 주차장에서도 자율주행차량을 가용 주차면까지 안내해 주차를 위한 배회를 없애는 솔루션이다. AI가 주차장에 설치된 CCTV(폐쇄회로TV), IoT(사물인터넷) 센서 등 기존 인프라에서 주차에 필요한 정보를 추출하고 가공해 차량에 전달한다.
	</span>
	<br style="color: rgb(51, 51, 51); font-family: 맑은고딕, &quot;Malgun Gothic&quot;, 돋움, dotum, sans-serif; font-size: 16px; letter-spacing: -0.4px; text-align: justify;">
	<br style="color: rgb(51, 51, 51); font-family: 맑은고딕, &quot;Malgun Gothic&quot;, 돋움, dotum, sans-serif; font-size: 16px; letter-spacing: -0.4px; text-align: justify;">
	<span style="color: rgb(51, 51, 51); font-family: 나눔고딕, NanumGothic; font-size: 12pt; letter-spacing: -0.4px; text-align: justify;">
		제로크루징을 적용한 자율주행차량은 실내 정밀 위치 정보와 V2I 통신으로 전달받은 정적·동적 정보를 사용해 실내 주차장에서도 최적의 경로로 자율주행을 수행한다. 업체 측은 "경로 탐색 및 상황 대응 능력이 높아져 운전자 없이도 주차면까지 안전하게 자율주행을 실현한다"고 말했다.</span>
	<span style="color: rgb(51, 51, 51); font-family: 나눔고딕,np NanumGothic; font-size: 12pt; letter-spacing: -0.4px; text-align: justify;">&nbsp;</span>
</p>`}
        </p>
      </CardContent>
    </Card>
  );
};
