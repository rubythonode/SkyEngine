# `SkyEngine.Screen`
게임 화면 전체를 다루는 오브젝트

사용 가능한 함수는 다음과 같습니다.

## `setFilter(filterStyle)`
화면 전체에 [CSS3 필터](https://developer.mozilla.org/ko/docs/Web/CSS/filter)를 적용합니다.

```javascript
SkyEngine.Screen.setFilter('grayscale(100%)');
```

## `removeFilter()`
적용된 필터를 제거합니다.