<template>
  <div class="signup-values">
    <div>
      <div class="signup-values__title">
        <span>Create ads that work</span>
        <!-- <span>Plans to help you grow</span> -->
      </div>
      <div class="signup-values__list">
        <!-- <div class="signup-values__list-item">
          <span class="signup-values__list-item-title"
            >Starter - $10/month</span
          >
          <p class="signup-values__list-item-description">
            You can create unlimited campaigns on all available platforms on
            your own but you can ask us as many questions, reviews and help as
            you need via email or chat.
          </p>
        </div>
        <div class="signup-values__list-item">
          <span class="signup-values__list-item-title">Plus - $80/month</span>
          <p class="signup-values__list-item-description">
            You can create unlimited campaigns on all available platforms and we
            setup calls twice a month, to go over setting up your campaigns and
            to review results.
          </p>
        </div>
        <div class="signup-values__list-item">
          <span class="signup-values__list-item-title"
            >White Glove - $200/month</span
          >
          <p class="signup-values__list-item-description">
            We create the campaigns for you on the app and we have weekly
            check-ins to make sure everything is going smooth.
          </p>
        </div> -->
        <div class="signup-values__list-item">
          <span>🚀 Works for Facebook, Instagram, Google and LinkedIn</span>
        </div>
        <div class="signup-values__list-item">
          <span>➡️ Guide solution from start to publish</span>
        </div>
        <div class="signup-values__list-item">
          <span>🤗 Get human help along the way</span>
        </div>
        <div class="signup-values__list-item">
          <span>😎 Professional looking ads</span>
        </div>
        <div class="signup-values__list-item">
          <span>👊 14 day trial, cancel anytime</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'SignupValues',
};
</script>
<style lang="scss">
.signup-values {
  display: flex;
  justify-content: center;
  height: 100vh;
  padding: 100px 60px 20px;
  @include mobile {
    padding: 100px 30px 20px;
  }
  &__title {
    background: $white;
    color: $primary;
    font-weight: bold;
    text-transform: uppercase;
    font-size: rem(35);
    padding: 0 10px;
    border-radius: 1px;
    @include mobile {
      font-size: 25px;
    }
  }
  &__list {
    margin: 40px 0px;
    &-item {
      color: $white;
      font-size: rem(20);
      margin-bottom: 20px;
      padding: 15px;
      &-title {
        font-size: rem(22);
        font-weight: 700;
      }
      &-description {
        font-size: rem(15);
      }
    }
  }
}
</style>
