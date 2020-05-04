<template>
    <div class="position-relative">
        <div id="accordion">
            <div>
                <div id="collapseCover" class="collapse show" data-parent="#accordion">
                    <img class="img-fluid trailer-cover" src="https://image.tmdb.org/t/p/w1280/q2CtXYjp9IlnfBcPktNkBPsuAEO.jpg">
                    <div class="custom-over-layer h-100 d-flex flex-column justify-content-between">
                        <div class="d-flex flex-row no-gutters">
                            <div class="col pt-2 pl-2">
                                <span class="text-white h6 lead lead-small">Some memories are best forgotten.</span>
                            </div>
                            <div class="col p-2 text-right">
                                <div>
                                    <small class="text-white">Based on your taste</small>
                                    <div>
                                        <span class="text-warning display-4 d-none d-md-inline">86%</span><span class="text-warning h5 d-md-none">86%</span><span class="text-white"><small> match</small></span>
                                    </div>
                                    <div>
                                        <span class="text-white"><small>296/392</small></span><span class="text-white"> <small>points</small></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-center">
                            <button class="btn btn-link text-white btn-lg collapsed" data-toggle="collapse" data-target="#collapseFragman" aria-expanded="false" aria-controls="collapseFragman"><font-awesome-icon :icon="['far', 'play-circle']" class="mr-2"/><small>TRAILERS &amp; VIDEOS</small></button>
                        </div>
                        <div class="d-flex flex-row justify-content-end p-2 text-right">
                            <div>
                                <div><span class="text-warning display-4 d-none d-md-inline">8.2</span><span class="text-warning h5 d-md-none">8.2</span><span class="text-white"> <small>/10</small></span></div>
                                <div class="text-white"><small>9310 votes</small></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div id="collapseFragman" class="collapse" data-parent="#accordion">
                    <div class="d-flex flex-row no-gutters pl-2 pt-2 pb-3" style="background: #000;">
                        <div class="col">
                            <div class="h-100 d-flex flex-column justify-content-center pl-2">
                                <span class="text-white h6 lead lead-small">Some memories are best forgotten.</span>
                            </div>
                        </div>
                        <div class="col pb-2 pr-2 text-right">
                            <div>
                                <div>
                                    <small class="text-white">Based on your taste </small><span class="text-warning h4 d-none d-md-inline">86%</span><span class="text-warning h5 d-md-none">86%</span><span class="text-white"> <small>match</small></span>
                                </div>
                                <div>
                                    <span class="text-white"><small>296/392</small></span><span class="text-white"> <small>points</small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="embed-responsive embed-responsive-1by1 trailer">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/Rq9eM4ZXRgs"></iframe>
                    </div>
                    <div class="d-flex flex-row no-gutters" style="background: #000;">
                        <div class="col-5">
                            <div class="h-100 d-flex flex-column justify-content-center pl-2">
                                <div>
                                    <button class="btn btn-outline-secondary border-0 btn-lg text-muted hover-white btn-trailer"><font-awesome-icon icon="step-backward"/></button>
                                    <button class="btn btn-outline-secondary border-0 btn-lg text-muted hover-white btn-trailer"><font-awesome-icon icon="step-forward"/></button>
                                    <div class="dropdown dnone d-inline">
                                        <button class="btn btn-outline-secondary border-0 btn-lg hover-white dropdown-toggle" type="button" id="dropdownchoosetrailer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownchoosetrailer">
                                            <a class="dropdown-item">Memento Original 35 mm Anamorphic Trailer (HD) (CC)</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="h-100 d-flex flex-column justify-content-center text-center">
                                <div>
                                    <button class="btn btn-outline-secondary border-0 btn-lg text-muted hover-white" data-toggle="collapse" data-target="#collapseCover" aria-expanded="true" aria-controls="collapseCover"><font-awesome-icon icon="angle-up" style="font-size: 40px;"/></button>
                                </div>
                            </div>
                        </div>
                        <div class="col-5 pb-2 pr-2 text-right">
                            <div>
                                <div><span class="text-warning h4 d-none d-md-inline">8.2</span><span class="text-warning h5 d-md-none">8.2</span><span class="text-white"> <small>/10</small></span></div>
                                <div class="text-white"><small>9310 votes</small></div>
                            </div>
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
.trailer-cover {
    object-fit: cover;
    width: 100%;
    max-height: 500px;
    min-height: 300px;
    filter: brightness(40%);
}
.custom-over-layer {
    position: absolute;
    width: 100%;
    top: 0;
}
.lead-small {
    font-size: 1rem;
}
.trailer {
    max-height: 500px;
}
.hover-white:hover { color: #fff!important; }
</style>