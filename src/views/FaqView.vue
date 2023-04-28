<template>
  <Navbar />
  <div class="bg-dark auto-height">
    <div class="container pt-utility auto-height-content">
      <div class="row">
        <div class="col-12">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb py-2 px-1 p-md-2 breadcrumb-style tracking-wider">
              <li class="breadcrumb-item">
                <RouterLink
                  to="/"
                  class="text-white text-decoration-none"
                  >首頁
                </RouterLink>
              </li>
              <li class="breadcrumb-item breadcrumb-item-none">公告&常見問題FAQ</li>
            </ol>
          </nav>
        </div>
        <div class="col-12 col-md-6 offset-md-3 text-white">
          <i class="bi bi-megaphone fs-1" />
          <a
            href="https://165.npa.gov.tw/#/"
            class="text-white text-decoration-none d-inline-block py-1">
            <span class="text-red font-semibold tracking-wide">
              【反詐騙提醒】
            </span>
            近來詐騙猖獗，行騙手法也不斷更新，提醒您：本司不會以任何名義透過電話、
            簡訊或Email等方式核對銀行帳戶、信用卡卡號等私人資訊
          </a>
          <a
            href="https://www.epa.gov.tw/Page/A0D5208FDB52DE77"
            class="text-white text-decoration-none d-inline-block py-1">
            <span class="text-red font-semibold tracking-wide">
              【公告】
            </span>
            2022年1月1日起已開始使用環保回收購物袋，如需使用紙袋將進行紙袋收費-我
            們與您一同實踐環保減廢活動
          </a>
          <a
            href="#"
            @click.prevent
            class="text-white text-decoration-none d-inline-block py-1">
            <span class="text-red font-semibold tracking-wide">
              【活動】
            </span>
            電子優待券及促銷說明：您在結帳時輸入coupon012，可以獲得我們目前的折扣、
            特別提供與交易。我們也將最新的電子優惠卷郵寄給我們的訂閱者，快去訂閱享受折扣。
          </a>
        </div>
          <div class="col-12 col-md-6 offset-md-3 my-5">
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="accordion-item rounded-0">
                <h2 class="accordion-header"
                  id="panelsStayOpen-headingOne">
                  <button
                    class="tracking-wide accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne">
                    官網下單後多久可以收到呢？
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  class="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingOne">
                  <div
                    class="accordion-body leading-7">
                    <p>
                      下單後4天內送達，未與時間如期送達贈與現金回饋補償
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header"
                  id="panelsStayOpen-headingTwo">
                  <button
                    class="tracking-wide accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo">
                    請問可以退換貨嗎？
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  class="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingTwo">
                  <div class="accordion-body leading-7">
                    <p>退換貨說明</p>
                    <p>請注意！請務必詳閱商品說明並再次確認確有購買該項商品之需求及意願時始下單購買，有任何疑問並請先聯繫客服詢問</p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                  <button
                    class="tracking-wide accordion-button collapsed rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree">
                    當付款失敗怎麼辦呢？
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingThree">
                  <div class="accordion-body leading-7">
                    請確認付款失敗原因後，先與發卡行聯繫，或更換其他信用卡進行付款。
                    另您可於付款失敗頁面點選「重新付款」進行後續刷卡流程，付款是否成功將再發函通知，
                    您屆時亦可至會員專區進行查詢訂單完成後30分鐘內，未付款成功，
                    系統將自動取消訂單，建議您可重新完成訂單後再進行支付。
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingFour">
                  <button
                    class="tracking-wide accordion-button collapsed rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFour"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree">
                    目前提供哪些付款方式？
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseFour" class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingFour">
                  <div class="accordion-body leading-7">
                    1.線上刷卡：使用信用卡(VISA、MASTER、JCB)即時線上刷卡，馬上就可以付款完成。
                    2.超商取貨付款
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingFive">
                  <button
                    class="tracking-wide accordion-button collapsed rounded-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseFive"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseFive">
                    請問有實體店面嗎？
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseFive" class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingFive">
                  <div class="accordion-body leading-7">
                    目前沒有實體店面喔！只經營網路商店，有設置實體客服中心並合法營業登記。
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingSix">
                  <button class="tracking-wide accordion-button collapsed rounded-0"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseSix"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseSix">
                    如果我的收件資料需要變更怎麼辦呢?
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseSix" class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingSix">
                  <div class="accordion-body leading-7">
                    在商品訂單尚未通知「商品已出貨」前皆可通知客服進行更改。
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingSeven">
                  <button class="tracking-wide accordion-button collapsed rounded-0"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseSeven"
                    aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven">
                    購買金額達多少以上可免運費？
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseSeven"
                  class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingSeven">
                  <div class="accordion-body leading-7">
                    歡慶開幕目前皆為免運費!!
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="panelsStayOpen-headingEight">
                  <button class="tracking-wide accordion-button collapsed rounded-0"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseEight"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseEight">
                    已完成訂購後，如需修改商品數量，是否可於網上直接修改訂單？
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseEight"
                  class="accordion-collapse collapse rounded-0"
                  aria-labelledby="panelsStayOpen-headingEight">
                  <div class="accordion-body leading-7">
                    在商品訂單尚未通知「商品已出貨」前皆可通知客服進行更改。
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 offset-md-3 text-white text-center mb-5">
            <div class="d-flex justify-content-end align-items-center">
              <RouterLink
                to="/user/contact"
                class="btn btn-light fw-bold">聯絡客服人員
              </RouterLink>
            </div>
          </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '@/components/FrontNavbar.vue';
import Footer from '@/components/FrontFooter.vue';

export default {
  components: {
    Navbar, Footer,
  },
};
</script>
