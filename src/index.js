/* eslint-disable no-new */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
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
	const productSliderOne = new Swiper('.product-slider-one .swiper', {
		init: false,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		clickable: true,

		pagination: {
			el: '.product-slider-one .swiper-pagination',
			clickable: true,
			bulletClass: 'swiper-pagination__bullet',
			bulletActiveClass: 'swiper-pagination__bullet--active',
		},

		breakpoints: {
			640: {
				navigation: {
					nextEl: '.product-slider-one .swiper-navigation--next',
					prevEl: '.product-slider-one .swiper-navigation--prev',
				},
			},
		},
	});

	productSliderOne.init();
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
	new Swiper('.brands-slider .swiper', {
		slidesPerView: 6,
		grid: {
			rows: 2,
		},
		spaceBetween: 25,

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
	new Swiper('.news-slider .swiper', {
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
