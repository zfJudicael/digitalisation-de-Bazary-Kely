import { ref } from 'vue';

export function useTypeWriter() {
  const textToShow = ref("");
  const currentText = ref("");
  const letterIndex = ref(0);
  var time = 0;
  
  const type = (text)=>{
    if(letterIndex.value < text.length){
      currentText.value += text.charAt(letterIndex.value);
      textToShow.value = currentText.value;
      letterIndex.value++;
      currentText.value.slice(-2)=="de" ? time = 700 : time = 100;
      setTimeout(()=>type(text), time);
    } 
    else {
      setTimeout(()=>erase(text) ,2000)
    }
  }
  
  const erase = (text)=>{
    if(letterIndex.value > 0){
      textToShow.value = textToShow.value.slice(0,-1);
      letterIndex.value--;
      setTimeout(()=>erase(text), 50);
    } else {
      currentText.value = "";
      setTimeout(()=>type(text), 1500);
    }
  }
  
  return { textToShow, type, erase }
}