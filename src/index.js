/* eslint-disable no-new */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */

// eslint-disable-next-line no-unused-vars
function throttle(function_, ms) {
	let isThrottled = false;
	let savedArguments;
	let savedThis;

	function wrapper(...argumentsList) {
		if (isThrottled) {
			// eslint-disable-next-line prefer-rest-params
			savedArguments = argumentsList;
			// eslint-disable-next-line unicorn/no-this-assignment
			savedThis = this;
			return;
		}

		// eslint-disable-next-line prefer-rest-params
		Reflect.apply(function_, this, argumentsList);

		isThrottled = true;

		// eslint-disable-next-line func-names
		setTimeout(function () {
			isThrottled = false;
			if (savedArguments) {
				wrapper.apply(savedThis, savedArguments);
				savedArguments = null;
				savedThis = null;
			}
		}, ms);
	}

	return wrapper;
}

function getCoords(element) {
	const box = element.getBoundingClientRect();

	return {
		top: Math.round(box.top + window.pageYOffset),
		right: Math.round(box.right + window.pageXOffset),
		bottom: Math.round(box.bottom + window.pageYOffset),
		left: Math.round(box.left + window.pageXOffset),
	};
}

{
	const header = document.querySelector('.header');
	const headerTop = header.querySelector('.header__top');
	const headerMiddle = header.querySelector('.header__middle');
	const buttonScrollUp = document.querySelector('.page__scroll-up');

	let headerMiddleHeight;
	let headerTopCoords;

	function getHeaderValues() {
		headerMiddleHeight = headerMiddle.clientHeight;
		headerTopCoords = getCoords(headerTop);
		console.log('get Val');
		switchHeaderSticky();
	}
	getHeaderValues();

	buttonScrollUp.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	});

	function switchHeaderSticky() {
		if (window.pageYOffset > headerTopCoords.bottom) {
			headerMiddle.classList.add('header__middle--fixed');
			headerTop.style.marginBottom = `${headerMiddleHeight}px`;
		} else {
			headerMiddle.classList.remove('header__middle--fixed');
			headerTop.style.marginBottom = 0;
		}
	}

	function switchButtonScrollUp() {
		if (window.pageYOffset > document.documentElement.clientHeight) {
			buttonScrollUp.classList.add('page__scroll-up--show');
		} else {
			buttonScrollUp.classList.remove('page__scroll-up--show');
		}
	}

	const windowScrollHandler = throttle(() => {
		switchHeaderSticky();
		switchButtonScrollUp();
	}, 10);

	const windowResizeHandler = throttle(() => {
		getHeaderValues();
	}, 100);

	window.addEventListener('scroll', windowScrollHandler, { passive: true });
	window.addEventListener('resize', windowResizeHandler, { passive: true });
}

{
	const bannersSlider = new Swiper('.banners-slider .swiper', {
		init: false,
		effect: 'fade',
		loop: true,
		autoplay: {
			delay: 5000,
		},
		clickable: true,

		pagination: {
			el: '.banners-slider .swiper-pagination',
			bulletElement: 'button',
			clickable: true,
			bulletClass: 'swiper-pagination__bullet',
			bulletActiveClass: 'swiper-pagination__bullet--active',
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.banners-slider .swiper-navigation--next',
					prevEl: '.banners-slider .swiper-navigation--prev',
				},
			},
		},
	});

	bannersSlider.init();
}

{
	const productsSliderOne = new Swiper('.popular-products-slider .swiper', {
		loop: true,
		// autoplay: {
		// 	delay: 5000,
		// },
		clickable: true,

		pagination: {
			el: '.popular-products-slider .swiper-pagination',
			bulletElement: 'button',
			clickable: true,
			bulletClass: 'swiper-pagination__bullet',
			bulletActiveClass: 'swiper-pagination__bullet--active',
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.popular-products-slider .swiper-navigation--next',
					prevEl: '.popular-products-slider .swiper-navigation--prev',
				},
			},
		},
	});

	productsSliderOne.init();
}

{
	const advantagesSlider = new Swiper('.advantages-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		spaceBetween: 5,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.advantages-slider .swiper-navigation--next',
					prevEl: '.advantages-slider .swiper-navigation--prev',
				},
			},
		},
	});

	advantagesSlider.init();
}

{
	const catalogSlider = new Swiper('.catalogs-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		spaceBetween: 12,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.catalogs-slider .swiper-navigation--next',
					prevEl: '.catalogs-slider .swiper-navigation--prev',
				},
			},
		},
	});

	catalogSlider.init();
}

{
	const brandsSlider = new Swiper('.brands-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		grid: {
			rows: 2,
		},
		spaceBetween: 24,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.brands-slider .swiper-navigation--next',
					prevEl: '.brands-slider .swiper-navigation--prev',
				},
			},
		},
	});

	brandsSlider.init();
}

{
	const worksSlider = new Swiper('.works-slider .swiper', {
		init: false,

		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.works-slider .swiper-navigation--next',
					prevEl: '.works-slider .swiper-navigation--prev',
				},
			},
		},
	});

	worksSlider.init();
}

{
	const promotionsSlider = new Swiper('.promotions-slider .swiper', {
		init: false,
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.promotions-slider .swiper-navigation--next',
					prevEl: '.promotions-slider .swiper-navigation--prev',
				},
			},
		},
	});
	promotionsSlider.init();
}

{
	const certificatesSlider = new Swiper('.certificates-slider .swiper', {
		init: false,
		slidesPerView: 2,
		freeMode: true,
		spaceBetween: 25,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.certificates-slider .swiper-navigation--next',
					prevEl: '.certificates-slider .swiper-navigation--prev',
				},
			},
		},
	});
	certificatesSlider.init();
}

{
	// eslint-disable-next-line no-unused-vars
	const news = new Swiper('.news-slider .swiper', {
		// init: false,
		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 40,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.news-slider .swiper-navigation--next',
					prevEl: '.news-slider .swiper-navigation--prev',
				},
			},
		},
	});
	// news.init();
}

{
	const infoSlider = new Swiper('.info-slider .swiper', {
		init: false,

		slidesPerView: 'auto',
		freeMode: true,
		spaceBetween: 40,

		autoplay: {
			delay: 5000,
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.info-slider .swiper-navigation--next',
					prevEl: '.info-slider .swiper-navigation--prev',
				},
			},
		},
	});

	infoSlider.init();
}

{
	class Tabbed {
		constructor(tabbed) {
			this.tabbed = tabbed;
			this.tablist = tabbed.querySelector('[data-type=tablist]');
			this.tabs = [...tabbed.querySelectorAll('[data-type=tab]')];
			this.panels = [...tabbed.querySelectorAll('[data-type=tabpanel]')];
		}

		initTabbed = () => {
			this.initTabs();
			this.initTablist();
			this.initPanels();
		};

		initTabs = () => {
			this.tabs.forEach((tab, tabIndex) => {
				tab.setAttribute('role', 'tab');
				tab.setAttribute('id', `tab${tabIndex + 1}`);
				tab.setAttribute('tabindex', '-1');
				const parent = tab.closest('[data-type="tab-parent"]');
				parent.setAttribute('role', 'presentation');

				this.tabAddClickHandler(tab);
				this.tabAddKeydownHandler(tab, tabIndex);
			});

			this.tabs[0].removeAttribute('tabindex');
			this.tabs[0].setAttribute('aria-selected', 'true');
		};

		initTablist = () => {
			this.tablist.setAttribute('role', 'tablist');
		};

		initPanels = () => {
			this.panels.forEach((panel, panelIndex) => {
				panel.setAttribute('role', 'tabpanel');
				panel.setAttribute('tabindex', '-1');
				panel.setAttribute('aria-labelledby', this.tabs[panelIndex].id);
				panel.hidden = true;
			});
			this.panels[0].hidden = false;
		};

		tabAddClickHandler = (tab) => {
			tab.addEventListener('click', (event) => {
				event.preventDefault();
				const currentTab = this.tablist.querySelector('[aria-selected]');
				if (event.currentTarget !== currentTab) {
					this.switchTab(currentTab, event.currentTarget);
				}
			});
		};

		tabAddKeydownHandler = (tab, tabIndex) => {
			tab.addEventListener('keydown', (event) => {
				const currentIndex = this.tabs.indexOf(event.currentTarget);

				const direction = this.getDirection(event, currentIndex);

				if (direction !== null) {
					event.preventDefault();
					if (direction === 'down') {
						this.panels[tabIndex].focus();
					} else if (this.tabs[direction]) {
						this.switchTab(event.currentTarget, this.tabs[direction]);
					}
				}
			});
		};

		getDirection = (event, currentIndex) => {
			return event.key === 'ArrowLeft'
				? currentIndex - 1
				: event.key === 'ArrowRight'
				? currentIndex + 1
				: event.key === 'ArrowDown'
				? 'down'
				: null;
		};

		switchTab = (oldTab, newTab) => {
			newTab.focus();
			newTab.removeAttribute('tabindex');
			newTab.setAttribute('aria-selected', 'true');

			oldTab.removeAttribute('aria-selected');
			oldTab.setAttribute('tabindex', '-1');
			const newIndex = this.tabs.indexOf(newTab);
			const oldIndex = this.tabs.indexOf(oldTab);

			this.panels[oldIndex].hidden = true;
			this.panels[newIndex].hidden = false;
		};
	}
	const tabbedList = document.querySelectorAll('[data-type=tabbed]');
	tabbedList.forEach(($tabbed) => {
		const tabbed = new Tabbed($tabbed);
		tabbed.initTabbed();
	});
}
