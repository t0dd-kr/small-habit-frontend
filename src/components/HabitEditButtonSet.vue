<template>
  <div>
    <!-- 습관 수정 -->
    <div class="버튼_박스" v-if="$route.params.id" >
      <div class="삭제_버튼" @click="confirm = !confirm">삭제</div>
      <div class="저장_버튼" @click="Edit" :style="{ backgroundColor: category.color }">저장</div>
    </div>
    <base-modal v-if="confirm && $route.params.id" class="confirm">
      <template v-slot:header>
        <div class="confirm_header">삭제 하시겠습니까?</div>
      </template>
      <template v-slot:contents>
        <div class="confirm_contents">
          <p>삭제하실 경우 모든 습관 정보가</p>
          <p>사라지고 복구할 수 없습니다.</p>
        </div>
      </template>
      <template v-slot:confirm>
        <div class="dual_button">
          <div class="button_left" @click="deleteObjective">확인</div>
          <div class="button_right" @click="confirm = !confirm">취소</div>
        </div>
      </template>
    </base-modal>

    <!-- 습관 생성-내용 있음 -->
    <div class="버튼_박스" v-if="$route.params.category">
      <div class="완료_버튼" @click="Edit" :style="{ backgroundColor: category.color }" >완료</div>
    </div>
    <base-modal v-if="edit && $route.params.category">
      <template v-slot:header >
        <div class="confirm_header">
          <img src="@/assets/confetti.png" alt="">
          <div>습관 생성을 완료했어요!</div>
          <img src="@/assets/confetti.png" alt="">
        </div>
      </template>
      <template v-slot:contents>
        <div class="confirm_contents">
          <p>습관 생성이 완료되었습니다.</p>
          <p>꾸준한 실천을 응원하겠습니다.</p>
        </div>
      </template>
      <template v-slot:confirm>
        <div class="complete_button" :style="{ backgroundColor: category.color }" @click="$router.push('/today')">
          확인
        </div>
      </template>
    </base-modal>
    <!-- 습관 생성-내용 없음 -->
    <base-modal v-if="confirm && $route.params.category">
      <template v-slot:header >
        <div class="confirm_header">
          <div>습관 생성에 실패했습니다.</div>
        </div>
      </template>
      <template v-slot:contents>
        <div class="confirm_contents">
          <p>작성하지 않은 내용이 있습니다.</p>
          <p>마저 작성해주시기 바랍니다.</p>
        </div>
      </template>
      <template v-slot:confirm>
        <div class="complete_button" :style="{ backgroundColor: category.color }" @click="confirm = !confirm">
          확인
        </div>
      </template>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
  components: {
    BaseModal,
  },
  data() {
    return {
      confirm: false
    }
  },
  props: ["habitItem", "category", "edit"],
  methods: {
    async deleteObjective() {
      try {
        await this.axios({
          method: 'delete',
          url: `/api/objective/${this.$route.params.id}`,
        })
        console.log('성공')
        location.href = '/today'
      }
      catch (err) {
        console.log(err.data);
      } 
    },
    Edit() {
      if(this.habitItem.objective && this.habitItem.schedule) {
        this.$emit("EditSave");
      } else {
        this.confirm = !this.confirm
      }
      
    },
  },
};
</script>
<style scope>
.버튼_박스 {
  position: fixed;
  bottom: 0%;
  display: flex;
  flex-flow: row;
  width: 720px;
  height: 60px;
  line-height: 60px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: #ffffff;
}
.삭제_버튼 {
  width: 50%;
  background: #ff5757;
  cursor: pointer;
}
.저장_버튼 {
  width: 50%;
  cursor: pointer;
}
.완료_버튼 {
  width: 100%;
  cursor: pointer;
}
.confirm_header {
  display: flex;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.confirm_header img{
  width: 50px;
  height: 45px;
}
.confirm_contents {
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 24px;
}
.dual_button {
  display: flex;
  justify-content: space-evenly;
  font-size: 20px;
  width: 100%;
}
.complete_button {
  width: 100%;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}
.dual_button div {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #fff;
}
.button_left {
  cursor: pointer;
  background-color: #ff545e;
}
.button_right {
  cursor: pointer;
  background-color: #5e5e5e;
}
</style>