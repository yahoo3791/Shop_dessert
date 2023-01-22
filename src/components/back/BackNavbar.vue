<template>
  <nav
    class="navbar navbar-expand-lg navbar-light
    bg-light position-relative top-0 start-0"
    style="z-index: 100;">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        href="/#/dashboard/backproducts">
        DESSERT
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup">
        <div
          class="navbar-nav text-center">
          <a class="nav-link" aria-current="page" href="#"
            @click.prevent="$router.push('/dashboard/backproducts')">產品
          </a>
          <a class="nav-link" href="#"
            @click.prevent="$router.push('/dashboard/order')">訂單
          </a>
          <a class="nav-link" href="#"
            @click.prevent="$router.push('/dashboard/coupon')">優惠卷
          </a>
          <a class="nav-link d-inline-block d-lg-none" href="#"
          @click.prevent="$router.push('/')">登出
        </a>
        </div>
          <a class="text-black d-none d-lg-block ms-auto href-none" href="#"
            @click.prevent="$router.push('/')">登出
          </a>
      </div>
    </div>
  </nav>
</template>
