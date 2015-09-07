<?php
abstract class Controller {
	protected $registry;

	public function __construct($registry) {
		$this->registry = $registry;
				
				if( ! $this->_mfp_path_init && ! empty( $this->request->get['mfp'] ) ) {
					preg_match( '/path\[([^]]*)\]/', $this->request->get['mfp'], $mf_matches );

					if( ! empty( $mf_matches[1] ) ) {
						if( empty( $this->request->get['mfilterAjax'] ) && ! empty( $this->request->get['path'] ) && $this->request->get['path'] != $mf_matches[1] ) {
							$this->request->get['mfp_org_path'] = $this->request->get['path'];
				
							if( 0 === ( $mf_strpos = strpos( $this->request->get['mfp_org_path'], $mf_matches[1] . '_' ) ) ) {
								$this->request->get['mfp_org_path'] = substr( $this->request->get['mfp_org_path'], $mf_strpos+strlen($mf_matches[1])+1 );
							}
						}
				
						$this->request->get['path'] = $mf_matches[1];

						if( isset( $this->request->get['category_id'] ) || ( isset( $this->request->get['route'] ) && in_array( $this->request->get['route'], array( 'product/search', 'product/special', 'product/manufacturer/info' ) ) ) ) {
							$mf_matches = explode( '_', $mf_matches[1] );
							$this->request->get['category_id'] = end( $mf_matches );
						}
					}
				
					unset( $mf_matches );
				}
			
	}

	public function __get($key) {
		return $this->registry->get($key);
	}

	public function __set($key, $value) {
		$this->registry->set($key, $value);
	}
}