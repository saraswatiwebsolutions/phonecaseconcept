<?php

if( ! function_exists( 'mf_render_btn_group' ) ) {
	
	function mf_render_btn_group( $text_yes, $text_no, $name, $enabled ) {
		$html = '';
		
		$html .= '<div class="btn-group" data-toggle="fm-buttons">';
		$html .= '<label class="btn btn-primary btn-xs' . ( $enabled ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( $enabled ? ' checked="checked"' : '' ) . ' value="1">' . $text_yes;
		$html .= '</label>';
		$html .= '<label class="btn btn-primary btn-xs' . ( ! $enabled ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( ! $enabled ? ' checked="checked"' : '' ) . ' value="0">' . $text_no;
		$html .= '</label>';
		$html .= '</div>';
		
		return $html;
	}
	
	function mf_render_btn_collapsed( $text_yes, $text_no, $text_pc, $text_mobile, $name, $value ) {
		$html = '';
		
		$html .= '<div class="btn-group" data-toggle="fm-buttons">';
		$html .= '<label class="btn btn-primary btn-xs' . ( $value == '1' ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( $value == '1' ? ' checked="checked"' : '' ) . ' value="1">' . $text_yes;
		$html .= '</label>';
		$html .= '<label class="btn btn-primary btn-xs' . ( ! $value ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( ! $value ? ' checked="checked"' : '' ) . ' value="0">' . $text_no;
		$html .= '</label>';
		$html .= '<label class="btn btn-primary btn-xs' . ( $value == 'pc' ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( $value == 'pc' ? ' checked="checked"' : '' ) . ' value="pc">' . $text_pc;
		$html .= '</label>';
		$html .= '<label class="btn btn-primary btn-xs' . ( $value == 'mobile' ? ' active' : '' ) . '">';
		$html .= '<input type="radio" name="' . $name . '"' . ( $value == 'mobile' ? ' checked="checked"' : '' ) . ' value="mobile">' . $text_mobile;
		$html .= '</label>';
		$html .= '</div>';
		
		return $html;
	}
	
}