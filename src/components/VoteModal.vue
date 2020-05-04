<template>
    <div class="d-flex flex-row align-items-center h-100">
        <div class="d-flex justify-content-center w-100">
            <div style="max-width: 492px; width: 100vw; position: relative;">
                <img class="card-img" style="border-radius: unset;" src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/l8RKDgjl9co0IgFZblxhtIOi5Uj.jpg">
                <div class="card-img-overlay p-0">
                    <div class="text-center h-100 d-flex flex-column justify-content-between">
                        <!-- header -->
                        <div class="d-flex flex-row justify-content-center">
                            <div>
                                <div class="h4" data-toggle="tooltip" data-placement="top" data-original-title="The Chronicles of Narnia: The Lion, the Witch and the Wardrobe">
                                    <a href="/movie/411">
                                        <span class="badge btn-darken-bg text-white rounded-0" style="white-space: normal;">
                                            The Chronicles of Narnia: The Lion, the Witch and the Wardrobe <small><em>(2005)</em></small>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- vote -->
                        <div class="d-flex flex-column">
                            <div class="d-flex flex-row justify-content-between">
                                <div></div>
                                <div>
                                    <button class="btn btn-lg success-darken-bg">Legendary</button>
                                </div>
                                <div></div>
                            </div>
                            <div class="d-flex flex-row justify-content-between mt-2">
                                <div></div>
                                <div>
                                    <button class="btn btn-lg info-darken-bg">Good</button>
                                </div>
                                <div></div>
                            </div>
                            <div class="d-flex flex-row justify-content-between mt-2">
                                <div></div>
                                <div>
                                    <button class="btn btn-lg secondary-darken-bg">Not Sure</button>
                                </div>
                                <div></div>
                            </div>
                            <div class="d-flex flex-row justify-content-between mt-2">
                                <div></div>
                                <div>
                                    <button class="btn btn-lg warning-darken-bg">Bad</button>
                                </div>
                                <div></div>
                            </div>
                            <div class="d-flex flex-row justify-content-between mt-2">
                                <div></div>
                                <div>
                                    <button class="btn btn-lg danger-darken-bg">Garbage</button>
                                </div>
                                <div></div>
                            </div>
                        </div>
                        <!-- footer -->
                        <div class="d-flex flex-row justify-content-between align-items-end" style="margin-bottom: 5px;">
                            <div>
                                <button type="button" class="btn btn-darken-bg float-left rounded-circle text-white btn-undo">
                                    <span><font-awesome-icon icon="undo-alt"/></span>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-darken-bg btn-lg text-white">Skip</button>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>

.btn-lg{
    width: 150px;
    border-radius: 50%;
    border: none;
    height: 48px;
    color: #fff;
}
.btn-lg:hover{ color: #fff; }

.btn-undo{
    position: absolute;
    left: 5px;
    bottom: 5px;
    width: 48px;
    height: 48px;
}

.btn-darken-bg{ background: #0008; }
.btn-darken-bg:hover{ background: #000f; }
.success-darken-bg{ background: var(--success-darken-color); }
.success-darken-bg:hover{ background: var(--success-hover-color); }
.info-darken-bg{ background: var(--info-darken-color); }
.info-darken-bg:hover{ background: var(--info-hover-color); }
.secondary-darken-bg{ background: var(--secondary-darken-color); }
.secondary-darken-bg:hover{ background: var(--secondary-hover-color); }
.warning-darken-bg{ background: var(--warning-darken-color); }
.warning-darken-bg:hover{ background: var(--warning-hover-color); }
.danger-darken-bg{ background: var(--danger-darken-color); }
.danger-darken-bg:hover{ background: var(--danger-hover-color); }
</style>